import {configureStore} from "@reduxjs/toolkit";
import listReducer from './slices/listSlice'


export default configureStore({
    reducer:{
        listReducer
    }
})