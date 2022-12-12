import React from 'react';
import styles from "../NewParagraph/NewParagraph.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquare} from "@fortawesome/free-regular-svg-icons";
import {faCheck, faMinus} from "@fortawesome/free-solid-svg-icons";

const NewParagraphItem = () => {
    return (
        <div className={styles.inputWrapper}>
            <FontAwesomeIcon className={styles.checkIcon} icon={faSquare}/>
            <input  className={styles.customInput} type="text" placeholder='Add task'/>
            {isFocus && <div className={styles.icons}>
                <FontAwesomeIcon   onClick={newParagraphs} icon={faCheck} />
                <FontAwesomeIcon  onClick={()=>setAddItem('')} icon={faMinus} />
            </div>}
        </div>
    );
};

export default NewParagraphItem;