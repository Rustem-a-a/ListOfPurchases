import React from 'react';
import ButtonCreate from "../ButtonCreate/ButtonCreate";
import List from "../List/List";
import styles from './Body.module.scss'
import {getShareListListSlice, toggleActiveModal} from "../../../store/slices/listSlice";
import {useDispatch, useSelector} from "react-redux";
import ListOfLists from "../ListOfLists/ListOfLists";
import Button from "../Button/Button";
import NewParagraph from "../NewParagraph/NewParagraph";
import Share from "../Share/Share";
import PostAddIcon from '@mui/icons-material/PostAdd';
import {Box} from "@mui/material";
import {blue} from "@mui/material/colors";

const Body = () => {
    const dispatch = useDispatch()
    const currentItemId = useSelector(state => state.listReducer.currentItemId)
    console.log(currentItemId)
    return (
        <div className={styles.bodyWrapper}>
            <div className={styles.left}>
                        <p>My list</p>
                        <PostAddIcon sx={{fontSize:80, color:'rgba(133, 211, 221, 1)'}} onClick={()=>{dispatch(toggleActiveModal())}}/>
                <ListOfLists/>
            </div>
            <div className={styles.right}>
                {currentItemId && <NewParagraph/>}
                {currentItemId && <Share/>}
                <List/>
            </div>
        </div>
    );
};

export default Body;