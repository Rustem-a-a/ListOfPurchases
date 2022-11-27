import React, {useEffect, useRef} from 'react';
import {Box, IconButton, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useState} from "react";
import {setParagraphsListSlice} from "../../../store/slices/listSlice";
import {useDispatch, useSelector} from "react-redux";

const NewParagraph = () => {
    const currentItemId = useSelector(state => state.listReducer.currentItemId)
    const currentOwnItem = useSelector(state => state.listReducer.items).filter(i=>i?._id===currentItemId)
    const currentSharedItem = useSelector(state => state.listReducer.sharedItem)
    let currentItem = []
         if(currentOwnItem?.[0]?._id===currentItemId){currentItem = currentOwnItem}
         else {currentItem = currentSharedItem}
    console.log(currentItem)
    const sharedItem = useSelector(state => state.listReducer.items).filter(i=>i?._id===currentItemId)
    const dispatch = useDispatch()
    const [addItem, setAddItem] = useState('')
    const newParagraphs = () => {
        if (addItem.trim().length) {
            dispatch(setParagraphsListSlice(
                {
                    id: currentItemId,
                    name: addItem,
                    completed: false
                }))
        }
        setAddItem('')
    }
    return (
        <>
            <h1>{currentItem?.[0]?.name}</h1>
            <Box>
                <TextField
                     onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            newParagraphs()
                        }
                    }}
                    value={addItem} onChange={(e) => setAddItem(e.target.value)} style={{width: 1200}} autoFocus={true}
                    color={'secondary'} sx={{m: 1}} id="standard-basic" label="Paragraph" variant="standard"
                />
                <IconButton
                    onClick={newParagraphs}
                    edge={'start'} color={'primary'}>
                    <AddIcon fontSize={'large'}/>
                </IconButton>
            </Box>
        </>
    );
};

export default NewParagraph;