import React, {useState} from 'react';
import styles from "../Login/Login.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {useDispatch} from "react-redux";
import {loginAuthSlice} from "../../../store/slices/authSlice";
import {Link,useNavigate} from 'react-router-dom'
import {toggleActiveModal} from "../../../store/slices/listSlice";
const inputStyles = {
    color:'black',
    border: '1px black solid'}

const Login = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cancel = ()=>{navigate('/',{replace:true})}
    const loginData = {
        username,
        password,
            }

    return (
            <div className={styles.modal} onClick={e => e.stopPropagation()}
                 onKeyDown={(event =>{
                     if(event.key==="Enter"){dispatch(loginAuthSlice(loginData))}
                     else if(event.key==="Escape") {cancel()}
                 })}>
                <div className={styles.modalName}>Login</div>
                <span className={styles.modalUsername}><Input
                    type='email'
                    autoFocus
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                    placeholder='Email'
                    style={{width:'32.604vw', height:'5.833vh'}}

                /></span>
                <span className={styles.modalPassword}><Input
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    placeholder='Password'
                    style={{width:'32.604vw', height:'5.833vh'}}

                /></span>
                <div className={styles.modalButtons}>
                    <Button><Link to='/'>Cancel</Link></Button>
                    <Button disabled={(username.trim().length||password.trim().length) && /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(username) ? false : true}
                            onClick={()=>dispatch(loginAuthSlice(loginData))}
                    >Login</Button>
                </div>
            </div>
    );
};

export default Login;