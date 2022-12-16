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
        console.log('registrationAuthSlice')
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
        console.log('loginAuthSlice')
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
        console.log('logoutAuthSlice')
    }catch (e){
        alert(e.response.data.message)
    }

         })

export const checkAuthSlice = createAsyncThunk('auth/checkAuthSlice', async ()=>{
    try{
        // const {data} = await axiosDef.get('http://localhost:5000/auth/refresh',{withCredentials:true})
        const {data} = await axiosDef.get('/auth/refresh',{withCredentials:true})
        localStorage.setItem('accessToken',data.accessToken)
        console.log('checkAuthSlice')
        console.log(data)
        return data.user
    }catch (e){
        // alert(e.response.data.message)
        console.log(e)
    }


})

const initialState = {
    user: {},
    isAuth: false,
    isActivated:true,
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
            state.isAuth = false
            // state.isActivated = false
            state.user = {}
        },
        [registrationAuthSlice.fulfilled]: (state, action) => {
            state.loading = false
            if (action.payload?.id){state.isAuth = true}
            // state.isActivated = action.payload?.isActivated
            state.user = action.payload
            state.isActivated = false
        },
        [registrationAuthSlice.rejected]: (state) => {
            state.loading = false
            // state.isActivated = false
            state.isAuth = false
            state.user = {}
        },
        [loginAuthSlice.pending]: (state) => {
            state.loading = true
            // state.isActivated = false
            state.isAuth = false
            state.user = {}
        },
        [loginAuthSlice.fulfilled]: (state, action) => {
            state.loading = false
            if (action.payload?.id) {state.isAuth = true}
            state.isActivated = action.payload?.isActivated
            state.user = action.payload
        },
        [loginAuthSlice.rejected]: (state) => {
            state.loading = false
            // state.isActivated = false
            state.isAuth = false
            state.user = {}
        },


        [checkAuthSlice.pending]: (state) => {
                state.loading = true
            state.isAuth = true
            // state.isActivated = true

        },
    [checkAuthSlice.fulfilled]: (state, action) => {
        state.loading = false
        console.log(action.payload)
        if (action.payload?.id) {state.isAuth = true}
        else {
            state.isAuth = false
        }
        if (action.payload?.id) {state.isActivated = action.payload?.isActivated}
        else {
            state.isActivated = true
        }

        // state.isActivated = action.payload?.isActivated
        state.user = action.payload
    },
    [checkAuthSlice.rejected]: (state) => {
        console.log('rejected')
        state.loading = false
        // state.isActivated = false
        state.isAuth = false
        state.user = null
    },

    [logoutAuthSlice.pending]: (state) => {
        state.loading = true
        // state.isActivated = false
        state.isAuth = false
        state.user = {}
    },
    [logoutAuthSlice.fulfilled]: (state) => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('currentItemId')
        state.loading = false
        // state.isActivated = false
        state.isAuth = false
        state.user = {}
    },
    [logoutAuthSlice.rejected]: (state) => {
        state.loading = false

    }
}


})
export const {exitAuth} = authSlice.actions
export default authSlice.reducer