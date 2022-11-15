import React from 'react';
import styles from './Input.module.scss'
const Input = (props) => {

    return (
        <div>
            <input {...props} type="text" className={styles.input}/>
        </div>
    );
};

export default Input;