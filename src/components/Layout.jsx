import React from 'react';
import {Outlet} from 'react-router-dom'
import Header from "./UI/Header/Header";
import Modal from "./UI/Modal/Modal";
import {useSelector} from "react-redux";
import styles from './Layout.module.scss'

const Layout = () => {
    const isActiveModal = useSelector(state=>state.listReducer.isActiveModal)
    const authSlice = useSelector((state) => state.authReducer)
    const isBlack = useSelector((state)=>state.listReducer.isBlack)

    return (
        <div className={isBlack ? ` ${styles.wrapper} ${styles.wrapperBlack}` : styles.wrapper}>
            <Header/>
            {!authSlice.isAuth && <h1 style={{textAlign:'center'}}>For using application signIn or signUp</h1>}
            <Outlet/>
            {isActiveModal && <Modal/>}
        </div>
    );
};

export default Layout;