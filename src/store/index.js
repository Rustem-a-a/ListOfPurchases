import {configureStore} from "@reduxjs/toolkit";
import listReducer from './slices/listSlice'
import authReducer from './slices/authSlice'


export default configureStore({
    reducer:{
        listReducer,
        authReducer
    }
})