import React, {useEffect, useMemo, useRef, useState} from 'react';
import {deleteParagraphListSlice, changeParagraphListSlice} from "../../../store/slices/listSlice";
import styles from "./List.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {TextField} from "@mui/material";
import useDeepCompareEffect from 'use-deep-compare-effect'

const List = () => {

    const currentItemId = useSelector(state => state.listReducer.currentItemId)
    console.log(currentItemId)
    const item = useSelector(state => state.listReducer.items)
    const currentItem = !!item.length ? item.filter(i=>i._id===currentItemId) : []
    console.log(currentItem)
    const currentParagraphs = !!currentItem.length ? currentItem[0].paragraph : []
    console.log(currentParagraphs)
    // const ref = useRef()
    // ref.current = currentParagraphs
    // console.log(!!ref.current===currentParagraphs)
    const currentParagraphsStr = JSON.stringify(currentParagraphs)
    const [componentParagraphs,setComponentParagraphs] = useState(currentParagraphs)

    useDeepCompareEffect(()=>setComponentParagraphs(currentParagraphs),[currentParagraphs])

    useEffect(()=>{setComponentParagraphs(currentParagraphs)},[currentParagraphsStr])
    // const ComponentParagraph = ()=>setComponentParagraphs([...currentParagraphs])
    // ComponentParagraph()
    // console.log(componentParagraphs)
    const dispatch = useDispatch()
    const complete = (currentParagraphID) => {
        const parID = componentParagraphs.filter(paragraph =>
            paragraph._id === currentParagraphID)
        console.log(parID)
        const dataForChangeParagraph = {
            itemID: currentItem[0]._id,
            paragraphID: parID[0]._id,
            completed: !parID[0].completed
        }
        console.log(dataForChangeParagraph)
        dispatch(changeParagraphListSlice(dataForChangeParagraph))
    }
    //
    const removeParagraphs = (currentParagraphID) => {
        const parID = componentParagraphs.filter(paragraph =>
            paragraph._id === currentParagraphID)
        const dataForChangeParagraph = {
            itemID: currentItem[0]._id,
            paragraphID: parID[0]._id,
        }
        dispatch(deleteParagraphListSlice(dataForChangeParagraph))
    }

    const changeNameOfParagraph = (currentParagraphID) => {
        const par = componentParagraphs.filter(paragraph =>
            paragraph._id === currentParagraphID)
        const dataForChangeParagraph = {
            itemID: currentItem[0]._id,
            paragraphID: par[0]._id,
            name: par[0].name
        }
           dispatch(changeParagraphListSlice(dataForChangeParagraph))
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