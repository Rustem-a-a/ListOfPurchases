import React,{useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './ListOfLists.module.scss'
import {Link} from 'react-router-dom'
import {getListListSlice, setCurrentItemId, setSharedItemListSlice} from "../../../store/slices/listSlice";

const ListOfLists = () => {
    // const currentItemId = useSelector(state => state.listReducer.currentItemId)
    // const currentOwnItem = useSelector(state => state.listReducer.items).filter(i=>i?._id===currentItemId)
    // const currentSharedItem = useSelector(state => state.listReducer.sharedItem)
    // let currentItem = []
    // if(currentOwnItem?.[0]?._id===currentItemId){currentItem = currentOwnItem}
    // else {currentItem = currentSharedItem}

    const sharedItems = useSelector(state => state.listReducer.sharedItems)
    const userItems = useSelector(state => state.listReducer.items)
    const sharedItemsId = useSelector(state => state.listReducer.sharedItemsId)
    const dispatch = useDispatch()


    useEffect(() => { dispatch(setSharedItemListSlice(sharedItemsId) )}, [])

    const totalCount = (UID)=>{
        let itemClick = userItems.filter(i=>i._id===UID)
        return  itemClick[0]?.paragraph.reduce((acc,item)=>{if(item) {return acc+1} else return  acc},0)}


    const completedCount = (UID)=>{
        let itemClick = userItems.filter(i=>i._id===UID)
        return  itemClick[0]?.paragraph.reduce((acc,item)=>{if(item.completed) {return acc+1} else return  acc},0)}

    const sharedTotalCount = (UID)=>{
        let itemClick = sharedItems.filter(i=>i._id===UID)
        return  itemClick[0]?.paragraph.reduce((acc,item)=>{if(item) {return acc+1} else return  acc},0)}


    const sharedCompletedCount = (UID)=>{
        let itemClick = sharedItems.filter(i=>i._id===UID)
        return  itemClick[0]?.paragraph.reduce((acc,item)=>{if(item.completed) {return acc+1} else return  acc},0)}

    return (
        <div className={styles.wrapper}>
            {userItems?.map((item)=>
                <Link to='/'
                         key={item._id}
                         className={styles.item}
                         onClick={()=>{
                            dispatch(setCurrentItemId(item._id))
                         }
                    }>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemCountCompleted}>({completedCount(item._id)}/{totalCount(item._id)})</div>
                </Link>
                 )}
            {!!sharedItemsId.length &&  <>
                <div className={styles.sharedList}>Shared lists:</div>
                {sharedItems.map((item)=>
                        <Link to='/'
                                 key={item._id}
                                 className={styles.item}
                                 onClick={()=>{
                                     dispatch(setCurrentItemId(item._id))
                                 }
                                 }>
                            <div className={styles.itemName}>{item.name}</div>
                            <div className={styles.itemCountCompleted}>({sharedCompletedCount(item._id)}/{sharedTotalCount(item._id)})</div>
                        </Link>
                    )}</>
            }
        </div>
    );
};

export default ListOfLists;