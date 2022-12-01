import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
    deleteParagraphListSlice,
    changeParagraphListSlice,
    getListListSlice,
    setSharedItemListSlice
} from "../../../store/slices/listSlice";
import styles from "./List.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {TextField} from "@mui/material";
import useDeepCompareEffect from 'use-deep-compare-effect'

const List = () => {

    const currentItemId = useSelector(state => state.listReducer.currentItemId)

    const currentOwnItem = useSelector(state => state.listReducer.items).filter(i=>i?._id===currentItemId)
    const currentSharedItem = useSelector(state => state.listReducer.sharedItems).filter(i=>i?._id===currentItemId)
    // ---------------- curItemId for function
    let currentItem = []
    const isOwnItem = !! currentOwnItem?.[0]

    if(currentOwnItem?.[0]?._id===currentItemId){currentItem = currentOwnItem}
    else {currentItem = currentSharedItem}

    const currentParagraphs = !!currentItem.length ? currentItem[0].paragraph : []
    const [componentParagraphs,setComponentParagraphs] = useState(currentParagraphs)
    const sharedItemsId = useSelector(state => state.listReducer.sharedItemsId)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(setSharedItemListSlice(sharedItemsId) )}, [sharedItemsId,currentSharedItem])

    useDeepCompareEffect(()=> {
        dispatch(setSharedItemListSlice(sharedItemsId))
    },[sharedItemsId,currentSharedItem])


    useDeepCompareEffect(()=>setComponentParagraphs(currentParagraphs),[currentParagraphs])


    const complete = (currentParagraphID) => {
        const parID = componentParagraphs.filter(paragraph =>
            paragraph._id === currentParagraphID)
        const dataForChangeParagraph = {

            itemID: currentItem[0]._id,
            paragraphID: parID[0]._id,
            completed: !parID[0].completed,
            isOwnItem
        }
        dispatch(changeParagraphListSlice(dataForChangeParagraph))
    }

    const removeParagraphs = (currentParagraphID) => {
        const parID = componentParagraphs.filter(paragraph =>
            paragraph._id === currentParagraphID)
        const dataForChangeParagraph = {
            itemID: currentItem[0]._id,
            paragraphID: parID[0]._id,
            isOwnItem
        }
        dispatch(deleteParagraphListSlice(dataForChangeParagraph))
        dispatch(getListListSlice())
    }

    const changeNameOfParagraph = (currentParagraphID) => {
        const par = componentParagraphs.filter(paragraph =>
            paragraph._id === currentParagraphID)
        const dataForChangeParagraph = {
            itemID: currentItem[0]._id,
            paragraphID: par[0]._id,
            name: par[0].name,
            isOwnItem
        }
           dispatch(changeParagraphListSlice(dataForChangeParagraph))
           dispatch(getListListSlice())
    }
    return (
        <>
            <ul className={styles.uls}>
                {componentParagraphs.map((item) => <li key={item._id}>
                        <input type='checkbox' checked={item.completed} onChange={() => complete(item._id)}/>
                        <span>
                            <TextField
                                style={{width: 1200}} color={'secondary'} sx={{m: 1}} id="standard-basic"
                                variant="standard" value={item.name}    onChange={(e)=> {
                                setComponentParagraphs(componentParagraphs.map(par => {
                                    if (par._id === item._id) {
                                        return {...par, name: e.target.value}
                                    } else return par
                                }))}}
                            />
                        </span>
                        <span onClick={() =>changeNameOfParagraph(item._id) }>✓</span>
                        <span onClick={() => removeParagraphs(item._id)}>❌</span>
                    </li>
                )}
            </ul>
        </>
    );
};

export default List;