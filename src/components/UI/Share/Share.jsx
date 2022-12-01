import React, {useState} from 'react';
import Button from "../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import axios from "../../../axios";
import Input from "../Input/Input";
import styles from "./Share.module.scss"

const Share = () => {
    const [isShareModal,setIsShareModal] = useState(false)
    const [arrOfReceivingUsers,setArrOfReceivingUsers] = useState([])
    const [receivingUser,setReceivingUser] = useState('')


    const userName = useSelector(state => state.authReducer.user?.username)
    console.log(userName)
    const linkItem = useSelector(state => state.listReducer.currentItemId)
    const item = useSelector(state => state.listReducer.items).filter(i=>i._id===linkItem)
    const dataToShare={
        to : receivingUser,
        link:"http://localhost:5000/db/"+linkItem ,
        from: userName,
        listName: item?.[0]?.name,
        itemId:linkItem
    }
    console.log(dataToShare)
    return (
        <div>
        <Button onClick={()=>{setIsShareModal(true)}}>Share</Button>

            { isShareModal && <div className={styles.sharemodalwrapper}>
                                     <Input value={receivingUser} onChange={(e)=>setReceivingUser(e.target.value)}/>
                                     {/*<Button onClick={()=>{setArrOfReceivingUsers([...arrOfReceivingUsers,receivingUser])}}>add receiver</Button>*/}
                                     {/*{arrOfReceivingUsers.map(item=><p>{item}</p>)}*/}
                <Button onClick={()=>{setIsShareModal(false)}}>Cancel</Button>
                <Button onClick={()=>{
                    console.log(dataToShare)
                    axios.post('/db/postShare', dataToShare)
                    console.log(dataToShare)
                    setReceivingUser('')
                    setIsShareModal(false)}}>Send</Button>

                              </div>
            }

        </div>
    );
};

export default Share;