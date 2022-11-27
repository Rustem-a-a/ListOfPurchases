import React, {useState, useEffect} from 'react';
import styles from './Modal.module.scss'
import Input from "../Input/Input";
import Button from "../Button/Button";
import todo from '../../../store/index'
import {setItem, setItemListSlice, toggleActiveModal} from "../../../store/slices/listSlice";
import {useDispatch} from "react-redux";

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

    useEffect(() => {
        const onKeypress = e => {
            if (e.keyCode === 13) {
                clickCreate()
            } else if (e.keyCode === 27) {
                dispatch(toggleActiveModal())
                setInput({
                    itemsName: '',
                    id: '',
                    completed: false
                })
            }
            ;
        }


        document.addEventListener('keydown', onKeypress);
        return () => {
            document.removeEventListener('keydown', onKeypress)

        }
        ;
    }, [input]);
    return (
        <div className={styles.wrapper}
             onClick={() => dispatch(toggleActiveModal())}
        >
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <h1>Create list</h1>
                <span><Input
                    autoFocus
                    value={input.itemsName}
                    onChange={(e) => {
                        setInput({
                            itemsName: e.target.value,
                            completed: false
                        })
                    }}
                    placeholder='Name of list'/></span>
                <div className={styles.btn}>
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