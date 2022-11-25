import React, {useEffect, useState} from 'react';
import {setParagraphsListSlice, deleteParagraphListSlice, changeParagraphListSlice, getShareListListSlice} from "../../../store/slices/listSlice";
import styles from "./List.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {Box, IconButton, Button, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const List = () => {
    const [addItem, setAddItem] = useState('')
    const UserList = useSelector((state) => state.listReducer)
    const currentListID = useSelector(state => state.listReducer.currentListId)
    const currentItem = currentListID
        ? UserList.items.filter((i) => i._id === currentListID)
        : UserList.items

    const currentParagraphs = currentItem[0].paragraph
    const [componentParagraphs,setComponentParagraphs] = useState([])
    useEffect(()=>{setComponentParagraphs([...currentParagraphs])},[currentParagraphs])

    console.log('List')
    const dataToShare={
        to : "rustem.abdulav@gmail.com",
        link:"https://shoppinglist.google.com/" ,
        from: 'Rustem Abdulaev',
        listName: 'to eata'
    }
    const dispatch = useDispatch()


    const newParagraphs = () => {
        if (addItem.trim().length) {
            dispatch(setParagraphsListSlice(
                {
                    id: currentListID,
                    name: addItem,
                    completed: false
                }))
        }
        setAddItem('')
    }
    const complete = (currentParagraphID) => {
        const parID = componentParagraphs.filter(paragraph =>
            paragraph._id === currentParagraphID)
        const dataForChangeParagraph = {
            itemID: currentItem[0]._id,
            paragraphID: parID[0]._id,
            completed: !parID[0].completed
        }
        dispatch(changeParagraphListSlice(dataForChangeParagraph))
    }

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
            <Box>
                <TextField
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            newParagraphs()
                        }
                    }}
                    value={addItem} onChange={(e) => setAddItem(e.target.value)} style={{width: 1200}} autoFocus={true}
                    color={'secondary'} sx={{m: 1}} id="standard-basic" label="Standard" variant="standard"
                />
                <IconButton
                    onClick={newParagraphs}
                    edge={'start'} color={'primary'}>
                    <AddIcon fontSize={'large'}/>
                </IconButton>
            </Box>
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
                {componentParagraphs[0]?.name && <Button onClick={()=>{dispatch(getShareListListSlice(dataToShare))}}>Share</Button>}
            </ul>


        </>
    );
};

export default List;