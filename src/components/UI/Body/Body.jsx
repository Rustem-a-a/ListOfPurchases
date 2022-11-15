import React from 'react';
import ButtonCreate from "../ButtonCreate/ButtonCreate";
import List from "../List/List";
import styles from './Body.module.scss'
import {toggleActiveModal} from "../../../store/slices/listSlice";
import {useDispatch} from "react-redux";
import ListOfLists from "../ListOfLists/ListOfLists";



const Body = ({create, items, setItems}) => {
    const dispatch = useDispatch()
    return (
        <div className={styles.bodyWrapper}>
            <div className={styles.left}>
                <ButtonCreate
                    onClick={()=>{dispatch(toggleActiveModal())}}
                    />
                <ListOfLists/>
                <hr/>
            </div>
            <div className={styles.right}>
                <List setItems={setItems}/>

            </div>
        </div>
    );
};

export default Body;