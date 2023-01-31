import React, {useState} from 'react';
import styles from "../Registration/Registration.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from 'react-router-dom'
import {loginAuthSlice, registrationAuthSlice} from "../../../store/slices/authSlice";

const inputStyles = {
    color:'black',
    border: '1px black solid'}


const Registration = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cancel = ()=>{navigate('/',{replace:true})}
    const registrationData = {
        username,
        password,
        // email
    }

       return (
        <div className={styles.wrapper}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}
                 onKeyDown={(event =>{
                     if(event.key==="Enter"){dispatch(registrationAuthSlice(registrationData))}
                     else if(event.key==="Escape") {cancel()}
                 })}>
                <div className={styles.modalName}>Registration</div>
                <span className={styles.modalUsername}><Input
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
                            onClick={()=>dispatch(registrationAuthSlice(registrationData))}
                    >Registration</Button>
                </div>
            </div>



            {/*<div className={styles.container}>*/}
            {/*    <div className="styles.containerInput">*/}
            {/*        <Input*/}
            {/*            type='email'*/}
            {/*            style ={inputStyles}*/}
            {/*            placeholder='Username'*/}
            {/*            onChange={(e)=>setUsername(e.target.value)}*/}
            {/*            value={username}/>*/}
            {/*        <Input*/}
            {/*            style ={inputStyles}*/}
            {/*            placeholder='Password'*/}
            {/*            onChange={(e)=>setPassword(e.target.value)}*/}
            {/*            value={password}/>*/}
            {/*        /!*<Input*!/*/}
            {/*        /!*    style ={inputStyles}*!/*/}
            {/*        /!*    placeholder='Email'*!/*/}
            {/*        /!*    onChange={(e)=>setEmail(e.target.value)}*!/*/}
            {/*        /!*    value={email}/>*!/*/}
            {/*    </div>*/}
            {/*    <div className={styles.containerBtn}>*/}
            {/*        <Button onClick={()=>dispatch(registrationAuthSlice(registrationData))}>Registration</Button>*/}
            {/*        <Link to='/'><Button>Cancel</Button></Link>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </div>
    );
};

export default Registration;