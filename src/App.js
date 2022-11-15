import Header from "./components/UI/Header/Header";
import Modal from "./components/UI/Modal/Modal";
import {useEffect, useState} from "react";
import Body from "./components/UI/Body/Body";
import todo from './items'
import {useSelector} from "react-redux";
import MUI from "./components/UI/MUI/MUI";
import React from "react";
import foo from '../src/store/slices/authSlice'

function App() {
    const [activeModal,setActiveModal] = useState(false)
    const [items,setItems] = useState([])
    const itemsR = useSelector(state => state.listReducer.items)
    const isActiveModal = useSelector(state=>state.listReducer.isActiveModal)
    console.log(itemsR)
    useEffect(()=>setItems([...todo]),[])
    // const create = ()=>{
    //     setActiveModal(true)
    // }
        return (
        <>
            {/*<Header/>*/}
            <MUI/>
            <Body items={items}
                  setItems={setItems}  />
            {isActiveModal && <Modal active={activeModal} setActive={setActiveModal} items={items} setItems={setItems}/>}
        </>
    );
}

export default App;
