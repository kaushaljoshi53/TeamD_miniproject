import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import '../styles/Signin.css'
import { TextField } from "@mui/material";
import { userDataValidations } from "../utils/userDataValidation";
import { ToastContainer, toast } from "react-toastify";

const jin = require("../assets/images/jin_login.png")

const Signin = () => {
    const Navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleEmailChange = (value: string) => {
        setEmail(value);
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
    };

    const handleSignIn = async () => {
        
        const response = await userDataValidations.signin(email, password) || '';

        if (response === "Logged In Successfully") {
            toast.success(response);
            setTimeout(() => {
                Navigate('/dashboard')
            },
                2000)
        }
        else if (response === "Invalid Credentials") {
            toast.error("Invalid Credentials");
        }
        else {
            toast.warning(response);
        }
    };

    return (
        <div className="Signin">
            <ToastContainer />
            <div className="bg">
                <img src={jin} alt="" />
            </div>
            <div className="main">
                <div className="form">
                    <h2>Sign In</h2>
                    <div className="inputs">
                        <TextField
                            label="Email"
                            size="small"
                            fullWidth
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            required
                            style={{ marginBottom: 10 }}
                        />
                        <TextField
                            label="Password"
                            size="small"
                            fullWidth
                            type="password"
                            value={password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            style={{ marginBottom: 10 }}
                            title=""
                        />
                        <button type="button" onClick={handleSignIn}>Sign In</button>
                        <span onClick={() => Navigate('/Signup')}>Not Registered?</span>
                        <span>Forgot password?</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin;