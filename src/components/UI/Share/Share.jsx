import React from 'react';
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import axios from "../../../axios";

const Share = () => {
    const userName = useSelector(state => state.authReducer.user?.username)
    const linkItem = useSelector(state => state.listReducer.currentItemId)
    const item = useSelector(state => state.listReducer.items).filter(i=>i._id===linkItem)
     const dataToShare={
        to : "rustem.abdulaev@gmail.com",
        link:"http://localhost:5000/db/"+linkItem ,
        from: userName,
        listName: item?.[0]?.name
    }
    return (
        <div>
<Button onClick={()=>{axios.post('/db/postShare', dataToShare)}}>Share</Button>
        </div>
    );
};

export default Share;