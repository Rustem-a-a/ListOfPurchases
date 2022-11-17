import React, {useState, useEffect} from 'react';
import styles from './Modal.module.scss'
import Input from "../Input/Input";
import Button from "../Button/Button";
import todo from '../../../store/index'
import {setItem, toggleActiveModal} from "../../../store/slices/listSlice";
import {useDispatch} from "react-redux";

const Modal = () => {
    const [input, setInput] = useState({
        name: null,
        id: '',
        completed: false
    })
    const dispatch = useDispatch()

    const clickCreate = () => {
        if (input.name !== null){
            dispatch(setItem(input))
        }
        setInput({
            name: null,
            id: '',
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
                    name: '',
                    id: '',
                    completed: false
                })
            }
            ;
        }

        document.addEventListener('keydown', onKeypress);
        return () => {
            document.removeEventListener('keydown', onKeypress);
        };
    }, [input]);
    return (
        <div className={styles.wrapper}
             onClick={() => dispatch(toggleActiveModal())}
        >
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <h1>Create list</h1>
                <span><Input
                    autoFocus
                    value={input.name}
                    onChange={(e) => {
                        setInput({
                            name: e.target.value,
                            id: Date.now(),
                            completed: false
                        })
                    }}
                    placeholder='Name of list'/></span>
                <div className={styles.btn}>
                    <Button onClick={() => dispatch(toggleActiveModal())}>Cancel</Button>
                    <Button disabled={input.name ? false : true}
                            onClick={clickCreate}
                    >Create</Button>
                </div>
            </div>

        </div>
    );
};

export default Modal;