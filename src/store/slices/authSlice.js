import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";
import axiosDef from 'axios'

export const registrationAuthSlice = createAsyncThunk('auth/registrationAuthSlice',
    async (registrationData) => {
    try{
        const {data} = await axios.post('/auth/registration', registrationData)
        if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken)
        }
        console.log(data)
        return data.user
    }catch (e){
        alert(e.response.data.message)
    }

})

export const loginAuthSlice = createAsyncThunk('auth/loginAuthSlice',
    async (loginData)=>{
    try{
        const {data} = await axios.post('/auth/login', loginData)
        if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken)
        }
        console.log(data)
        return data.user
    }catch (e){
        alert(e.response.data.message)
    }


})

export const logoutAuthSlice = createAsyncThunk('auth/logoutAuthSlice',
    async ()=>{
    try{
        await axios.get('/auth/logout')
        localStorage.removeItem('accessToken')
    }catch (e){
        alert(e.response.data.message)
    }

         })

export const checkAuthSlice = createAsyncThunk('auth/checkAuthSlice', async ()=>{
    try{
        const {data} = await axiosDef('http://localhost:5000/auth/refresh',{withCredentials:true})
        localStorage.setItem('accessToken',data.accessToken)
        return data.user
    }catch (e){
        // alert(e.response.data.message)
        console.log(e)
    }


})

const initialState = {
    user: null,
    isAuth: false,
    isActivated:false,
    loading: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        exitAuth(state) {
            state.user = {}
            state.isAuth = false
            localStorage.removeItem('accessToken')
        },
    },
    extraReducers: {
        [registrationAuthSlice.pending]: (state) => {
            state.loading = true
        },
        [registrationAuthSlice.fulfilled]: (state, action) => {
            state.loading = false
            if (action.payload?.id){state.isAuth = true}

            state.user = action.payload
        },
        [registrationAuthSlice.rejected]:(state)=>{
            state.loading = false
        },
        [loginAuthSlice.pending]: (state) => {
            state.loading = true
        },
        [loginAuthSlice.fulfilled]: (state, action) => {
            state.loading = false
            if (action.payload?.id){state.isAuth = true}

            state.user = action.payload
        },
        [loginAuthSlice.rejected]:(state)=>{
            state.loading = false
        },

        [checkAuthSlice.pending]: (state) => {
            state.loading = true
        },
        [checkAuthSlice.fulfilled]: (state, action) => {
            state.loading = false
            if (action.payload?.id){state.isAuth = true}
            state.user = action.payload

        },
        [checkAuthSlice.rejected]:(state)=>{
            state.loading = false
        },

        [logoutAuthSlice.pending]: (state) => {
            state.loading = true
        },
        [logoutAuthSlice.fulfilled]: (state) => {
            state.loading = false
            state.isAuth = false
            state.user = {}
        },
        [logoutAuthSlice.rejected]:(state)=>{
            state.loading = false
        }
    }


})
export const {exitAuth} = authSlice.actions
export default authSlice.reducer