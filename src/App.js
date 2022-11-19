import Body from "./components/UI/Body/Body";
import React, {useEffect} from "react";
import {Routes, Route, Navigate} from 'react-router-dom'
import Registration from "./components/UI/Registration/Registration";
import Layout from "./components/Layout";
import {useDispatch, useSelector} from "react-redux";
import Login from './components/UI/Login/Login'
import {checkAuthSlice} from "./store/slices/authSlice";

function App() {
    const authSlice = useSelector((state) => state.authReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(checkAuthSlice())
    }, [])

    return (
        <>
            <Routes>
                <Route path='/' element={<Layout/>}>

                    {authSlice.isAuth && <Route index element={<Body/>}/>}

                    {authSlice.loading ? <></>
                        : <>{!authSlice.isAuth ? <Route path='registration' element={<Registration/>}/>
                            : <Route path='registration' element={<Navigate to='/' replace/>}/>}</>
                    }
                   {authSlice.loading ? <></>
                        : <>{!authSlice.isAuth ? <Route path='login' element={<Login/>}/>
                            : <Route path='login' element={<Navigate to='/' replace/>}/>}</>
                    }
                    <Route path='*' element={<Body/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
