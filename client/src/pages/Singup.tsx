import React from "react";
import "../styles/Signup.css";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { Validations } from "../validations/Validation";
import { userdata } from "../models/Userdata";

const jin = require("../assets/images/jin_login.png");

export const Signup: React.FC = () => {
    const valid = new Validations()
    const Navigate = useNavigate();

    const [fname,setFname] = useState<string>('');
    const [lname,setLname] = useState<string>('');
    const [email,setEmail] = useState<string>('');
    const [empid,setEmpid] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [repassword,setRepassword] = useState<string>('');
    const data:userdata = {
        fname:fname,
        lname:lname,
        email:email,
        empid:empid,
        password:password,
        repassword:repassword
    }

    

    return (
        <div className="signup">
            <div className="bg">
                <img src={jin} alt="" />
            </div>
            <div className="main">
                <div className="form">
                    <h2>Sign Up</h2>
                    <div className="inputs">
                        <div className="name">
                            <input type="text" name="fname" id="fname" placeholder="First Name*" onChange={(e)=>setFname(e.target.value)} required />
                            <input type="text" name="lname" id="lname" placeholder="Last Name*" onChange={(e)=>setLname(e.target.value)} required />
                        </div>
                        <div className="credentials">
                            <input type="text" name="email" id="email" placeholder="Email*" onChange={(e)=>setEmail(e.target.value)} required />
                            <input type="text" name="empid" id="empid" placeholder="Employee ID*" onChange={(e)=>setEmpid(e.target.value)} required />
                            <input type="password" name="pass" id="pass" placeholder="Password*" onChange={(e)=>setPassword(e.target.value)} required />
                            <input type="password" name="pass" id="pass" placeholder="Enter password again*" onChange={(e)=>setRepassword(e.target.value)} required />

                        </div>
                        <button type="button" onClick={()=>valid.signup(data)} >Sign Up</button>
                        <span onClick={()=>Navigate('/')}>Already a User? Sign-In</span>
                    </div>

                </div>
            </div>
        </div>
    );
}