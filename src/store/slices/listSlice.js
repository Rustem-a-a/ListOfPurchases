import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const setItemListSlice = createAsyncThunk('listSlice/setItemListSlice',
    async (dataModal)=>{
    try{
        const {data} = await axios.post('/db/listAdd',dataModal)
        console.log(data)
        return data
        }
    catch (e) {
        alert('setItemListSlice' + e.response.data.message)
    }
})

export const setParagraphsListSlice = createAsyncThunk('listSlice/setParagraphsListSlice',
    async (dataList)=>{
    try{
        const {data} = await axios.patch(`/db/paragraphChange/${dataList.id}`,
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
        const{data} = await axios.patch(`/db/updateParagraph/${dataList.itemID}/${dataList.paragraphID}`,{completed:dataList.completed,name:dataList.name})
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
        const{data} = await axios.delete(`/db/deleteParagraph/${dataList.itemID}/${dataList.paragraphID}`)
        console.log(data)
        return data
    }
    catch (e) {

    }
    })


export const getListListSlice = createAsyncThunk('listSlice/getListListSlice',
    async ()=>{
        try{
            const {data} = await axios('/db/getList')
            console.log(data)
            return data
        }
        catch (e) {
            alert('getListListSlice' + e.response.data.message)
        }
    })

export const getShareListListSlice = createAsyncThunk('listSlice/getListListSlice',
    async (dataToShare)=>{
        try{
            console.log(dataToShare)
            const {data} = await axios.post('/db/getShare', dataToShare)
            console.log(data)
            return data
        }
        catch (e) {
            alert(e.response.data.message)
        }
    })

const initialState = {
    items:
        [
        {    _id: '',
             name: '',
             completed: false,
             paragraph: [
                {
                    name: '',
                    _id: '',
                    completed: false},
             ]
        }
    ]
    ,
    isActiveModal: false,
    currentListId:'',
    currentList: {
        name: '',
        paragraph: [],
        _id: null,
        completed: false
    },
}
const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers:
        {
            setCurrentListId(state,action){
                state.currentListId = action.payload._id
                state.currentList = action.payload
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

        },
    extraReducers:{
        [setItemListSlice.pending]:(state)=>{
        },

        [setItemListSlice.fulfilled]:(state,action)=>{
        state.items = action.payload.newUser.items
        },

        [setItemListSlice.rejected]:(state,action)=>{
        },

        [getListListSlice.pending]:(state)=>{
    },

        [getListListSlice.fulfilled]:(state,action)=>{
            state.items = action.payload.items
            state.currentListId = action.payload.items[0]._id
            },

        [getListListSlice.rejected]:(state)=>{
        console.log('rejected' + JSON.stringify(state))
        },

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
        }
}})

export const {
    toggleActiveModal,
    removeItem,
    toggleItemCompleted,
    setItem,
    removeParagraph,
    toggleParagraphsCompleted,
    setCurrentListId,
    newParagraph,
    changeParagraph,
    updateParagraph

} = listSlice.actions
export default listSlice.reducer