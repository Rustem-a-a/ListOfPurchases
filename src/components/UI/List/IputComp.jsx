import React, {useState} from 'react';
import styles from './Input.module.scss'
const Input = (props) => {
    const[inp,setInp] = useState('')
    console.log('inp')
    return (
        <div>
            <input value={inp} onChange={(e)=>{setInp(e.target.value)}} type="text" className={styles.input}/>
        </div>
    );
};

export default Input;