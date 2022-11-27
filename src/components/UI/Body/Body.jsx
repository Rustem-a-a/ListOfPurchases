import React from 'react';
import ButtonCreate from "../ButtonCreate/ButtonCreate";
import List from "../List/List";
import styles from './Body.module.scss'
import {getShareListListSlice, toggleActiveModal} from "../../../store/slices/listSlice";
import {useDispatch} from "react-redux";
import ListOfLists from "../ListOfLists/ListOfLists";
import Button from "../Button/Button";
import NewParagraph from "../NewParagraph/NewParagraph";
import Share from "../Share/Share";

const Body = () => {
    const dispatch = useDispatch()

    return (
        <div className={styles.bodyWrapper}>
            <div className={styles.left}>
                <ButtonCreate
                    onClick={()=>{dispatch(toggleActiveModal())}}
                    />
                <ListOfLists/>

            </div>
            <div className={styles.right}>
                <NewParagraph/>
                <Share/>
                <List/>
            </div>
        </div>
    );
};

export default Body;