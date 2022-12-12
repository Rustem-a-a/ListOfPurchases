import React, {useState} from 'react';
import Button from "../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import axios from "../../../axios";
import Input from "../Input/Input";
import styles from "./Share.module.scss"
import {toggleActiveModal} from "../../../store/slices/listSlice";

const Share = ({setIsShareModalProps}) => {
    const [input,setInput] = useState('')
    const userName = useSelector(state => state.authReducer.user?.username)
    console.log(userName)
    const linkItem = useSelector(state => state.listReducer.currentItemId)
    const item = useSelector(state => state.listReducer.items).filter(i=>i._id===linkItem)
    const dataToShare={
        to : input,
        link:"http://localhost:5000/db/"+linkItem ,
        from: userName,
        listName: item?.[0]?.name,
        itemId:linkItem
    }
    console.log(dataToShare)
    const isBlack = useSelector((state)=>state.listReducer.isBlack)
    return (
        <div className={isBlack ? `${styles.wrapper} ${styles.wrapperBlack}` :styles.wrapper}
             onClick={()=>setIsShareModalProps(false)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.modalName}>Share list</div>
                <span className={styles.modalInput}><Input
                    autoFocus
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value)}}
                    placeholder='Recipient email'
                    style={{width:'32.604vw', height:'5.833vh'}}/></span>
                <div className={styles.modalButtons}>
                    <Button onClick={() => setIsShareModalProps(false)}>Cancel</Button>
                    <Button disabled={input.trim().length ? false : true}
                            onClick={()=>{
                                console.log(dataToShare)
                                // axios.post('/db/postShare', dataToShare)
                                axios.post('https://listofpurchasesserver.onrender.com/db/postShare', dataToShare)
                                console.log(dataToShare)
                                setInput('')
                                setIsShareModalProps(false)}
                            }
                    >Share</Button>
                </div>
            </div>
        </div>
    );
};

export default Share;