import React, {useEffect, useState} from 'react';
import {
    removeItem,
    setItem,
    toggleItemCompleted,
    newParagraph,
    removeParagraph,
    updateParagraph,
    changeParagraph
} from "../../../store/slices/listSlice";
import styles from "./List.module.scss";
import {useDispatch, useSelector} from "react-redux";
import Input from "../Input/Input";
// import Button from "../Button/Button";
import {Box, IconButton, Button,TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const List = () => {
    const [addItem, setAddItem] = useState('')
    const items = useSelector(state => state.listReducer.currentList.paragraph)
    const [chParagraph,setChParagraph] = useState([...items])
    console.log(items)
    console.log(chParagraph)
    const currentList = useSelector(state => state.listReducer.currentList)
    const dispatch = useDispatch()
    const newParagraphs = () => {
        if(addItem.trim().length){
            dispatch(newParagraph({
                name: addItem,
                id: Math.random(),
                completed: false
            }))}setAddItem('')}
    const removeTodo = (itemId) => dispatch(removeItem(items.filter((item) => itemId !== item.id)))
    const removeParagraphs = (itemId) => dispatch(removeParagraph(items.filter((item) => itemId !== item.id)))
       const complete = (itemsId) => {
        dispatch(toggleItemCompleted(
            chParagraph.map((item) => {
                if (itemsId !== item.id) return item;
                return {...item, completed: !item.completed}
            })))
    }
    useEffect(()=>{setChParagraph(items)},[items])
    return (


        <>
              <Box>
                <TextField
                    onKeyPress={(e)=>{if(e.key==='Enter'){newParagraphs()}
                    }}
                    value={addItem}
                    onChange={(e) => setAddItem(e.target.value)}
                    style = {{width: 1200}}
                    autoFocus={true}
                    color={'secondary'}
                    sx={{m:1}}
                    id="standard-basic"
                    label="Standard"
                    variant="standard"
                    />
                <IconButton
                    onClick={newParagraphs}
                    edge={'start'}
                    color={'primary'}>
                    <AddIcon fontSize={'large'} />
                </IconButton>
            </Box>

            <ul className={styles.uls}>
                {chParagraph.map((item) =>
                    <li key={item.id}>
                        <input type='checkbox'
                               checked={item.completed}
                               onChange={() => complete(item.id)}
                        />
                        <span>
                            <TextField

                                value={item.name}
                                onChange={(e) =>{
                                    setChParagraph(chParagraph.map(p=>{if(p.id===item.id){
                                        const newPar= {
                                            name: e.target.value,
                                            id: p.id,
                                            completed: p.completed
                                        }
                                        return newPar;
                                    }return p
                                    }))}}
                                style = {{width: 1200}}
                                color={'secondary'}
                                sx={{m:1}}
                                id="standard-basic"
                                label="Standard"
                                variant="standard"
                            />
                        </span>

                        <span onClick={() => removeParagraphs(item.id)}>❌</span>
                    </li>
                )}

            </ul>
        <Button
            color={'secondary'}
            sx={{backgroundColor:'#64b5f6',color:'black','&:hover':{backgroundColor:'green'}}}
            onClick={()=>{dispatch(updateParagraph(chParagraph))}} >Update list</Button>

        </>
    );
};

// <ul className={styles.uls}>
//     {currentList.paragraph.map((item) =>
//         <li key={item.id}>
//             <input type='checkbox'
//                    checked={item.completed}
//                    onChange={() => complete(item.id)}
//             />
//             <TextField
//                 value={chParagraph}
//                 onChange={(e) =>{
//                     setChParagraph(chParagraph.map(p=>{
//                         if(p.id===item.id){
//                             p.name=e.target.value}
//                         return p
//                     }))}}
//                 style = {{width: 1200}}
//                 autoFocus={true}
//                 color={'secondary'}
//                 sx={{m:1}}
//                 id="standard-basic"
//                 label="Standard"
//                 variant="standard" />
//             <span onClick={() => removeParagraphs(item.id)}>❌</span>
//         </li>
//     )}
//
// </ul>


export default List;