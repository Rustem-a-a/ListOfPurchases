import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from '../../axios'





const foo  = async ()=>{
    try{
        const {data} = await axios.get('/auth/authorization',
            {headers: {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzY0MDgwZjVlNWY4ODBkMjI4OGIwMDgiLCJpYXQiOjE2Njc1MDAwNDcsImV4cCI6MTY2NzUwMzY0N30.OvqQBCZwLLVJccJ-YB-HCm3ifQ3c7wgTP_y6FS8KQ4c"}}
        )
        return data
    }
    catch (e) {
        console.log(e)
    }

}
export default foo