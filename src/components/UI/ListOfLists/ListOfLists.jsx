import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './ListOfLists.module.scss'
import {NavLink} from 'react-router-dom'
import {setCurrentList} from "../../../store/slices/listSlice";

const ListOfLists = () => {
    const listOfLists = useSelector(state => state.listReducer.items)
    const dispatch = useDispatch()
    return (
        <div className={styles.wrapper}>
            {listOfLists.map((item)=>
                <NavLink to='/'
                         className={styles.paragraph}
                         key={item.id}
                onClick={()=>{dispatch(setCurrentList(item))
                    }}>
                    <div >{item.name}</div>
                </NavLink>
                 )}
        </div>
    );
};

export default ListOfLists;