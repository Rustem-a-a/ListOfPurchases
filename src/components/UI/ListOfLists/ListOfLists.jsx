import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './ListOfLists.module.scss'
import {NavLink} from 'react-router-dom'
import {getListListSlice, setCurrentListId} from "../../../store/slices/listSlice";
import axios from "../../../axios";

const ListOfLists = () => {
    const listOfLists = useSelector(state => state.listReducer.items)
    const dispatch = useDispatch()
    return (
        <div className={styles.wrapper}>
            {listOfLists.map((item)=>
                <NavLink key={item._id}
                         to='/'
                         className={styles.paragraph}
                         onClick={()=>{
                            dispatch(setCurrentListId(item))
                    }}>
                    <div>{item.name}</div>
                </NavLink>
                 )}
        </div>
    );
};

export default ListOfLists;