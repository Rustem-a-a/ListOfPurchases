import React, {useState} from 'react';
import styles from "../Registration/Registration.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {useDispatch} from "react-redux";
import {Link} from 'react-router-dom'
import {registrationAuthSlice} from "../../../store/slices/authSlice";

const inputStyles = {
    color:'black',
    border: '1px black solid'}


const Registration = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail ]= useState('')
    const dispatch = useDispatch()
    const registrationData = {
        username,
        password,
        // email
    }

       return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className="styles.containerInput">
                    <Input
                        type='email'
                        style ={inputStyles}
                        placeholder='Username'
                        onChange={(e)=>setUsername(e.target.value)}
                        value={username}/>
                    <Input
                        style ={inputStyles}
                        placeholder='Password'
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}/>
                    {/*<Input*/}
                    {/*    style ={inputStyles}*/}
                    {/*    placeholder='Email'*/}
                    {/*    onChange={(e)=>setEmail(e.target.value)}*/}
                    {/*    value={email}/>*/}
                </div>
                <div className={styles.containerBtn}>
                    <Button onClick={()=>dispatch(registrationAuthSlice(registrationData))}>Registration</Button>
                    <Link to='/'><Button>Cancel</Button></Link>
                </div>
            </div>

        </div>
    );
};

export default Registration;