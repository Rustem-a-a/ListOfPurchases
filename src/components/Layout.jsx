import React from 'react';
import {Outlet} from 'react-router-dom'
import Header from "./UI/Header/Header";
import Modal from "./UI/Modal/Modal";
import {useSelector} from "react-redux";

const Layout = () => {
    const isActiveModal = useSelector(state=>state.listReducer.isActiveModal)
    const authSlice = useSelector((state) => state.authReducer)
    return (
        <>
            <Header/>
            {!authSlice.isAuth && <h1 style={{textAlign:'center'}}>For using application signIn or signUp</h1>}
            <Outlet/>
            {/*<Body/>*/}
            {isActiveModal && <Modal/>}
        </>
    );
};

export default Layout;