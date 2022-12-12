import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";
import items from "../../items";

export const getListListSlice = createAsyncThunk('listSlice/getListListSlice',
    async ()=>{
        try{
            const {data} = await axios('/db/getList')
            console.log('getListListSlice')
            console.log(data)
            return data
        }
        catch (e) {
            // alert('getListListSlice' + e.response.data.message)
            console.log(e)
        }
    })


export const setItemListSlice = createAsyncThunk('listSlice/setItemListSlice',
    async (dataModal)=>{
    try{
        console.log('setItemListSlice!!!!!!!!!')
        const {data} = await axios.post('/db/listAdd',dataModal)
        console.log('setItemListSlice!!!!!')
        console.log(data)
        return data
        }
    catch (e) {
        alert('setItemListSlice!!!' + e.response.data.message)
    }
})


export const setSharedItemListSlice = createAsyncThunk('listSlice/setSharedItemListSlice',
    async (arrayId)=>{
        try{
            console.log('setSharedItemListSlice')
            const {data} = await axios.post('/db/filter',{sharedUserItemsId:arrayId})
            console.log('setItemListSlice')
            console.log(data)
            return data
        }
        catch (e) {
            alert('setSharedItemListSlice!!!!!!!' + e.response.data.message)
        }
    })



export const setParagraphsListSlice = createAsyncThunk('listSlice/setParagraphsListSlice',
    async (dataList)=>{
    try{
        console.log(dataList)
        const {data} = await axios.patch(`/db/paragraphChange/${dataList.id}/${dataList.isOwnItem}`,
            {paragraphName:dataList.name, completed: dataList.completed})
        console.log(data)
        return data
    }
  catch (e) {
      console.log('error from setParagrListSlice')
        }
    })

export const changeParagraphListSlice = createAsyncThunk('listSlice/changeParagraphListSlice',
    async (dataList)=>{

    try {
        console.log(dataList)
        const{data} = await axios.patch(`/db/updateParagraph/${dataList.itemID}/${dataList.paragraphID}/${dataList.isOwnItem}`,{completed:dataList.completed,name:dataList.name})
        console.log(data)
        return data
    }
    catch (e){
        alert('changeParagraphListSlice' + e.response.data.message)
    }
})

export const deleteParagraphListSlice = createAsyncThunk('listSlice/deleteParagraphListSlice',
    async (dataList)=>{
    try {
        console.log(dataList)
        const{data} = await axios.delete(`/db/deleteParagraph/${dataList.itemID}/${dataList.paragraphID}/${dataList.isOwnItem}`)
        console.log(data)
        return data
    }
    catch (e) {

    }
    })

export const deleteItemListSlice = createAsyncThunk('listSlice/deleteListListSlice',
    async (deletedItemId)=>{
    try{
        console.log(deletedItemId)
        const {data} = await axios.delete(`/db/listDelete/${deletedItemId}`)
        console.log(data)
        return data
    }
    catch (e) {

    }
    })


const initialState = {
    isBlack:false,
    items:
        [
            ],
    currentItemId:null,
        sharedItems:
    [],
    sharedItemsId:
        [],
    isActiveModal: false,
    }
const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers:

        {
            setTheme(state,action){
                state.isBlack=!JSON.parse(JSON.stringify(state.isBlack))
                console.log(JSON.parse(JSON.stringify(state.isBlack)))
        },
            setCurrentItemId(state,action){
                state.currentItemId = action.payload
                localStorage.setItem('currentItemId',action.payload)
            },
            setCurrentList(state,action){

                console.log(action.payload)
            },
            toggleActiveModal(state, action) {
                state.isActiveModal = !state.isActiveModal
            },
            setItem(state, action) {
                state.items.push(action.payload)
            },
            removeItem(state, action) {
                state.items = action.payload
            },
            newParagraph(state,action){
              state.currentList.paragraph.push(action.payload)
            },
            updateParagraph(state,action){
                console.log(action.payload.itemId)

            },
            changeParagraph(state,action){

             // state.currentList.paragraph.filter(p=>p.id === action.payload[0].id)
             //    console.log(JSON.stringify(action.payload))
            },
            removeParagraph(state, action) {
                state.currentList.paragraph = action.payload
            },

            toggleItemCompleted(state, action) {
                state.currentList.paragraph = action.payload
            },
            // toggleParagraphsCompleted(state, action) {
            //     state.paragraphs = action.payload
            // }

            logoutList(state){
                 state.items = []
                 state.currentItemId = null
                localStorage.removeItem('currentItemId')   }
    },
    extraReducers:{
        [getListListSlice.pending]:(state)=>{},
        [getListListSlice.fulfilled]:(state,action)=>{
            console.log(action.payload.userList.sharedItems)
            state.sharedItemsId =action.payload.userList.sharedItems
            console.log(JSON.parse(JSON.stringify(state.sharedItemsId)))
            state.items = !!action.payload?.userList
                ? action.payload.userList.items
                : []
               // state.items = !!action.payload?.userList
               //  ? action.payload.userList.items
               //  : []
            if(localStorage.getItem('currentItemId')){
                state.currentItemId =localStorage.getItem('currentItemId')
            }
            else{
                !!action.payload?.userList
                ? state.currentItemId = action.payload.userList.items[0]._id
                : state.currentItemId = null

                !!action.payload?.userList
                ? localStorage.setItem('currentItemId',action.payload.userList.items[0]._id)
                :localStorage.removeItem('currentItemId')}
        },
        [getListListSlice.rejected]:(state)=>{},




        [setItemListSlice.pending]:(state)=>{},

        [setItemListSlice.fulfilled]:(state,action)=>{
        state.items = action.payload.updatedList.items
        state.currentItemId = action.payload.updatedList.items[action.payload.updatedList.items.length-1]._id
        localStorage.setItem('currentItemId',action.payload.updatedList.items[action.payload.updatedList.items.length-1]._id)
            state.sharedItemsId =action.payload.updatedList.sharedItems
        },

        [setItemListSlice.rejected]:(state,action)=>{},



        [setSharedItemListSlice.pending]:(state)=>{},

        [setSharedItemListSlice.fulfilled]:(state,action)=>{
            const sharedItemsArray = []
            action.payload?.forEach(obj=>{
                obj.items?.forEach(item=>{sharedItemsArray.push(item)})
            })
            state.sharedItems = sharedItemsArray
            console.log(sharedItemsArray)
        },

        [setSharedItemListSlice.rejected]:(state,action)=>{},





        [setParagraphsListSlice.pending]:(state,action)=>{
            },

        [setParagraphsListSlice.fulfilled]:(state,action)=>{
        state.items = action.payload.updatedUser.items
            },

        [setParagraphsListSlice.rejected]:(state,action)=>{
},

        [changeParagraphListSlice.pending]:(state,action)=>{
        },

        [changeParagraphListSlice.fulfilled]:(state,action)=>{
            state.items = action.payload.updatedUser.items
            console.log(action.payload)
        },

        [changeParagraphListSlice.rejected]:(state,action)=>{
        },

        [deleteParagraphListSlice.pending]:(state,action)=>{
        },

        [deleteParagraphListSlice.fulfilled]:(state,action)=>{
            state.items = action.payload.updatedUser.items
            console.log(action.payload)
        },

        [deleteParagraphListSlice.rejected]:(state,action)=>{
        },


        [deleteItemListSlice.pending]:(state,action)=>{
        },

        [deleteItemListSlice.fulfilled]:(state,action)=>{
            state.items = action.payload.updatedUser?.items
            localStorage.removeItem('currentItemId')

            !!action.payload?.updatedUser?.items
                ? state.currentItemId = action.payload.updatedUser.items[0]?._id
                : state.currentItemId = null

            !!action.payload?.updatedUser?.items
                ? localStorage.setItem('currentItemId',action.payload.updatedUser.items[0]?._id)
                : localStorage.removeItem('currentItemId')

            console.log('after')
        },

        [deleteItemListSlice.rejected]:(state,action)=>{
        },


}})

export const {
    toggleActiveModal,
    removeItem,
    toggleItemCompleted,
    setItem,
    removeParagraph,
    setCurrentItemId,
    changeParagraph,
    logoutList,
    setTheme

} = listSlice.actions
export default listSlice.reducer