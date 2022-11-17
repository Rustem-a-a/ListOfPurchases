import React, {useState} from 'react';
import styles from "../Login/Login.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {useDispatch} from "react-redux";
import {loginAuthSlice} from "../../../store/slices/authSlice";
import {Link} from 'react-router-dom'
const inputStyles = {
    color:'black',
    border: '1px black solid'}

const Login = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch()
    const loginData = {
        username,
        password,
            }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className="styles.containerInput">
                    <Input
                        style ={inputStyles}
                        placeholder='Username'
                        onChange={(e)=>setUsername(e.target.value)}
                        value={username}/>
                    <Input
                        style ={inputStyles}
                        placeholder='Password'
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}/>
                </div>
                <div className={styles.containerBtn}>
                    <Button onClick={()=>dispatch(loginAuthSlice(loginData))}>Login</Button>
                    <Link to='/'><Button>Cancel</Button></Link>
                </div>
            </div>

        </div>
    );
};

export default Login;