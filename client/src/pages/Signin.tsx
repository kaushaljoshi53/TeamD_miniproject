import React from "react";
import { useNavigate } from 'react-router-dom'
import '../styles/Signin.css'

const jin = require("../assets/images/jin_login.png")


export const Signin = () => {

    const Navigate = useNavigate()

    return (
        <div className="Signin">
            <div className="bg">
                <img src={jin} alt="" />
            </div>
            <div className="main">
                <div className="form">
                    <h2>Sign In</h2>
                    <div className="inputs">
                        <input type="text" placeholder='Email*' />
                        <input type="text" placeholder='Password*' />
                        <button type="button">Sign In</button>
                        <span onClick={() => Navigate('/Signup')}>Not Registered?</span>
                        <span>Forgot password?</span>
                    </div>
                </div>
            </div>
        </div>
    );
}