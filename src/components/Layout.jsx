import React from 'react';
import {Outlet} from 'react-router-dom'
import Header from "./UI/Header/Header";
import Modal from "./UI/Modal/Modal";
import {useSelector} from "react-redux";

const Layout = () => {
    const isActiveModal = useSelector(state=>state.listReducer.isActiveModal)

    return (
        <>
            <Header/>
            <Outlet/>
            {/*<Body/>*/}
            {isActiveModal && <Modal/>}
        </>
    );
};

export default Layout;