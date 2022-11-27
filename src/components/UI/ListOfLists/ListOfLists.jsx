import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './ListOfLists.module.scss'
import {NavLink} from 'react-router-dom'
import {setCurrentItemId} from "../../../store/slices/listSlice";
import axios from "../../../axios";

const ListOfLists = () => {
    const userItems = useSelector(state => state.listReducer.items)
    const sharedItemsId = useSelector(state => state.listReducer.sharedItemsId)
    const dispatch = useDispatch()
    return (
        <div className={styles.wrapper}>
            {userItems.map((item)=>
                <NavLink to='/'
                         key={item._id}
                         className={styles.paragraph}
                         onClick={()=>
                            dispatch(setCurrentItemId(item._id))
                    }>
                    <div >{item.name}</div>
                </NavLink>
                 )}
            {!!sharedItemsId.length &&  <>
                <h3>Shared lists:</h3>
                {sharedItemsId.map((item)=>
                        <NavLink to='/'
                                 key={item._id}
                                 className={styles.paragraph}
                                 onClick={()=>{
                                     dispatch(setCurrentItemId(item._id))
                                 }
                                 }>
                            <div >{item.name}</div>
                        </NavLink>
                    )}</>
            }
        </div>
    );
};

export default ListOfLists;