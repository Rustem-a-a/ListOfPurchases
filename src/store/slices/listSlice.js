import {createSlice, current} from "@reduxjs/toolkit";

const initialState = {
    items: [{
        name: 'tomatoes',
        paragraph: [{name: 'one',
            id: Math.random(),
            completed: false},{name: 'two',
            id: Math.random(),
            completed: false}],
        id: Date.now(),
        completed: false
    },
        {
            name: 'potatos',
            paragraph: [],
            id: Date.now() + 1,
            completed: false
        }
    ],
    isActiveModal: false,
    currentList: {
        name: '',
        paragraph: [],
        id: Date.now(),
        completed: false
    },
    }
const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers:
        {
            setCurrentList(state,action){
              state.currentList = action.payload
                console.log()
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
                state.currentList.paragraph = action.payload
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

        }
})

export const {
    toggleActiveModal,
    removeItem,
    toggleItemCompleted,
    setItem,
    removeParagraph,
    toggleParagraphsCompleted,
    setCurrentList,
    newParagraph,
    changeParagraph,
    updateParagraph

} = listSlice.actions
export default listSlice.reducer