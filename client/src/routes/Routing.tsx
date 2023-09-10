import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from '../pages/Dashboard';
import { Signup } from '../pages/Singup';
import { Signin } from '../pages/Signin';

export const Routing = ()=>{
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Signin/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
            </Routes>
        </Router>
    )
}