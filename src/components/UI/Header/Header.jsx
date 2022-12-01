import React from 'react';
import {AppBar, Box, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {logoutAuthSlice} from "../../../store/slices/authSlice";
import {Stack,Avatar} from '@mui/material'
import {Link} from 'react-router-dom'
import styles from './Header.module.scss'
import {logoutList} from "../../../store/slices/listSlice";

const Header = () => {
    const authState = useSelector(state=>state.authReducer)
    const dispatch = useDispatch()

    return (
<div className={styles.wrapper}>
                    <div className={styles.title}>Shopping list</div>
                    <div className={styles.authorization}>
                        {authState.loading ? <p>Loading...</p>
                            : <div className={styles.login}>{!authState.isAuth && <Link to='/login'><p>Login</p></Link>}
                                {!authState.isAuth && <Link to='/registration'><p>Registration</p></Link>}</div>
                        }
                        {!authState.loading &&
                            <div className={styles.exit}>
                                {authState.isAuth &&
                                    <div className={styles.avatar}>
                                        <Avatar sx={{ bgcolor: [500] }}>{authState?.user?.username?.[0].toUpperCase()}</Avatar>
                                    </div>
                                }
                                {authState.isAuth && <Link to='/'><p onClick={()=>{
                                    dispatch(logoutAuthSlice())
                                    dispatch(logoutList())}
                                }>Exit</p></Link>}</div>}
                    </div>

</div>
    );
};

export default Header;