import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from '../pages/Dashboard';
import { Signup } from '../pages/Signup';
import { Login } from '../pages/Login';
import { MyProfile } from '../pages/MyProfile';
import { Forget_Password } from '../pages/Forget_Password';

export const Routing = ()=>{
    return(
        <>
            <Router>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/forget_password' element={<Forget_Password/>}/>
                <Route path='/MyProfile' element={<MyProfile/>}/>
            </Routes>
        </Router>
        </>
    )
}