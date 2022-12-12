import React, {useEffect, useRef} from 'react';
import {Box, IconButton, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useState} from "react";
import {deleteItemListSlice, setParagraphsListSlice} from "../../../store/slices/listSlice";
import {useDispatch, useSelector} from "react-redux";
import Button from '../Button/Button'
import useDeepCompareEffect from "use-deep-compare-effect";
import styles from "../NewParagraph/NewParagraph.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan, faShareNodes, faCheck, faMinus, } from "@fortawesome/free-solid-svg-icons";
import {faSquare} from "@fortawesome/free-regular-svg-icons";
import Share from '../Share/Share'
const NewParagraph = () => {
    const [isShareModalProps,setIsShareModalProps] = useState(false)
    const[isFocus,setIsFocus] = useState(false)
    const currentItemId = useSelector(state => state.listReducer.currentItemId)
    const currentOwnItem = useSelector(state => state.listReducer.items).filter(i=>i?._id===currentItemId)
    const isOwnItem = !! currentOwnItem?.[0]
    const currentSharedItem = useSelector(state => state.listReducer.sharedItems).filter(i=>i?._id===currentItemId)
    let currentItem = []
         if(currentOwnItem?.[0]?._id===currentItemId){currentItem = currentOwnItem}
         else {currentItem = currentSharedItem}
    console.log(currentItem)
    const dispatch = useDispatch()
    const [addItem, setAddItem] = useState('')
    const newParagraphs = () => {
        if (addItem.trim().length) {
            dispatch(setParagraphsListSlice(
                {
                    id: currentItemId,
                    name: addItem,
                    completed: false,
                    isOwnItem
                }))
        }
        setAddItem('')
    }

    const isBlack = useSelector((state)=>state.listReducer.isBlack)
    return (
        <div className={isBlack ? `${styles.wrapper} ${styles.wrapperBlack}` :styles.wrapper }>
            {isShareModalProps&& <Share setIsShareModalProps={setIsShareModalProps}/>}
            <div className={styles.listNameIcons}>
                <div className={styles.listName}>List {currentItem?.[0]?.name}</div>
                <div className={styles.deleteShare}>
                    <div onClick={()=>setIsShareModalProps(true)} className={styles.delete}><FontAwesomeIcon icon={faShareNodes} /></div>
                    <div onClick={()=>{dispatch(deleteItemListSlice(currentItemId))}} className={styles.share}><FontAwesomeIcon icon={faTrashCan} /></div>
                </div>
            </div>
            <div className={styles.newParagraph}>
                <label htmlFor="input"><div className={styles.inputWrapper}>

                        <input autoComplete='off' id='input' className={styles.customInput} type="text" placeholder='Add task'
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        newParagraphs()
                                    }
                                }}
                                value={addItem} onChange={(e) => setAddItem(e.target.value)}
                               autoFocus={true}
                        />
                        <div className={styles.iconActive}>
                            <FontAwesomeIcon   onClick={newParagraphs} icon={faCheck} />
                            <FontAwesomeIcon  onClick={()=>setAddItem('')} icon={faMinus} />
                        </div>
                    </div></label>
            </div>
            <div className={styles.tasks}>Tasks:</div>
            <div className={styles.paragraphs}></div>
        </div>
    );
};

export default NewParagraph;