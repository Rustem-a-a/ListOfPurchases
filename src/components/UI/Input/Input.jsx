import React from 'react';
import styles from './Input.module.scss'
import {useSelector} from "react-redux";
const Input = (props) => {
    const isBlack = useSelector((state)=>state.listReducer.isBlack)
    return (
        <div>
            <input {...props} type="text" className={isBlack ? `${styles.input} ${styles.inputBlack}` : styles.input}/>
        </div>
    );
};

export default Input;