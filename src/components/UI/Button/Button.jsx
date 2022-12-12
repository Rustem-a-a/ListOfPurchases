import React from 'react';
import styles from './Button.module.scss'
import {useSelector} from "react-redux";
const Button = ({children,...props}) => {
    const isBlack = useSelector((state)=>state.listReducer.isBlack)
    return (
        <button {...props} className={isBlack ? `${styles.button} ${styles.buttonBlack}` : styles.button}>{children}</button>
    );
};

export default Button;