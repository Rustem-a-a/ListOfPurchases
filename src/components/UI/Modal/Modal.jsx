import React, {useState, useEffect} from 'react';
import styles from './Modal.module.scss'
import Input from "../Input/Input";
import Button from "../Button/Button";
import todo from '../../../store/index'
import {setItem, setItemListSlice, toggleActiveModal} from "../../../store/slices/listSlice";
import {useDispatch, useSelector} from "react-redux";

const Modal = () => {
    const [input, setInput] = useState({
        itemsName: null,
        completed: false
    })
    const dispatch = useDispatch()

    const clickCreate = () => {
        if (input.itemsName !== null){
            dispatch(setItemListSlice(input))
        }
        setInput({
            itemsName: null,
            completed: false
        })
        dispatch(toggleActiveModal())
    }
    const isBlack = useSelector((state)=>state.listReducer.isBlack)
    //
    // useEffect(() => {
    //     const onKeypress = e => {
    //         if (e.keyCode === 13) {
    //             clickCreate()
    //         } else if (e.keyCode === 27) {
    //             dispatch(toggleActiveModal())
    //             setInput({
    //                 itemsName: '',
    //                 id: '',
    //                 completed: false
    //             })
    //         }
    //         ;
    //     }
    //
    //
    //     document.addEventListener('keydown', onKeypress);
    //     return () => {
    //         document.removeEventListener('keydown', onKeypress)
    //
    //     }
    //     ;
    // }, [input]);
    return (
        <div className={isBlack ? `${styles.wrapper} ${styles.wrapperBlack}` :styles.wrapper }
             onClick={() => dispatch(toggleActiveModal())}>
            <div className={styles.modal}
                 onKeyDown={e=>{
                     if(e.key==='Enter'){clickCreate()}
                     else if(e.key==='Escape'){
                         dispatch(toggleActiveModal())
                         setInput({
                             itemsName: '',
                             id: '',
                             completed: false
                         })
                     }
                 }}
                 onClick={e => e.stopPropagation()}>
                <div className={styles.modalName}>Create list</div>
                <span className={styles.modalInput}><Input
                    autoFocus
                    value={input.itemsName}
                    onChange={(e) => {
                        setInput({
                            itemsName: e.target.value,
                            completed: false
                        })
                    }}
                    placeholder='Name of list'
                    style={{width:'32.604vw', height:'5.833vh'}}

                /></span>
                <div className={styles.modalButtons}>
                    <Button onClick={() => dispatch(toggleActiveModal())}>Cancel</Button>
                    <Button disabled={input.itemsName ? false : true}
                            onClick={clickCreate}
                    >Create</Button>
                </div>
            </div>

        </div>
    );
};

export default Modal;