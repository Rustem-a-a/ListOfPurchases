import React from 'react';
import styles from './ButtonCreate.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const ButtonCreate = (props) => {
    return (
        <div className={styles.button}
             {...props} >
            <FontAwesomeIcon icon={faPlus}/>
            <span>Create</span>
        </div>
    );
};

export default ButtonCreate;