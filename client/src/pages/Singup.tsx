// src/components/Signup.tsx

import React, { useState } from "react";
import "../styles/Signup.css";
import { useNavigate } from "react-router-dom";
import { TextField, Button, InputAdornment } from "@mui/material";
import {userDataValidations} from "../utils/userDataValidation"; // Import validation functions
import {signUpRealTime} from "../utils/realTimeValidation";
import { userdata } from "../models/Userdata";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const jin = require("../assets/images/jin_login.png");

export const Signup: React.FC = () => {
  const navigate = useNavigate();

  // Define state variables for form fields and errors
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [employeeId, setEmployeeId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    employeeId: "",
    password: "",
    rePassword: "",
  });

  // Handle validations in real-time
  const handleFirstNameChange = (val: string) => {
    setFirstName(val);
    setFormErrors({ ...formErrors, firstName: signUpRealTime.validateName(val) });
  };

  const handleLastNameChange = (val: string) => {
    setLastName(val);
    setFormErrors({ ...formErrors, lastName: signUpRealTime.validateName(val) });
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    setFormErrors({ ...formErrors, email: signUpRealTime.validateEmail(val) });
  };

  const handleEmployeeIdChange = (val: string) => {
    setEmployeeId(val);
    setFormErrors({ ...formErrors, employeeId: signUpRealTime.validateEmployeeID(val) });
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    setFormErrors({ ...formErrors, password: signUpRealTime.validatePassword(val) });
  };

  const handleRePasswordChange = (val: string) => {
    setRePassword(val);
    setFormErrors({ ...formErrors, rePassword: signUpRealTime.validateRepassword(password, val) });
  };

  // Handle form submission
  const handleSubmit = async () => {
    const data: userdata = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      employeeId: employeeId,
      password: password,
    }

    
    const message = await userDataValidations.signup(data,rePassword) || '';


    if (message !== 'User registered successfully') {
      toast.error(message);
    } else {
      toast.success("Sign up successful!"); 
      setTimeout(()=>{
        navigate('/')
      },2000)
    }

  };

  return (
    <div className="signup">
      <ToastContainer />
      <div className="bg">
        <img src={jin} alt="" />
      </div>
      <div className="main">
        <div className="form">
          <h2>Sign Up</h2>
          <div className="inputs">
            <div className="name">
              <TextField
                label="First Name"
                size="small"
                fullWidth
                value={firstName}
                onChange={(e) => handleFirstNameChange(e.target.value)}
                error={!!formErrors.firstName}
                helperText={formErrors.firstName}
                required
                style={{ marginBottom: 10 }}
              />
              <TextField
                label="Last Name"
                size="small"
                fullWidth
                value={lastName}
                onChange={(e) => handleLastNameChange(e.target.value)}
                error={!!formErrors.lastName}
                helperText={formErrors.lastName}
                style={{ marginBottom: 10 }}
              />
            </div>
            <div className="credentials">
              <TextField
                label="Email"
                size="small"
                fullWidth
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                required
                style={{ marginBottom: 10 }}
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
              <TextField
                label="Employee ID"
                size="small"
                fullWidth
                value={employeeId}
                onChange={(e) => handleEmployeeIdChange(e.target.value)}
                required
                style={{ marginBottom: 10 }}
                error={!!formErrors.employeeId}
                helperText={formErrors.employeeId}
                InputProps={{
                  startAdornment: <InputAdornment position="start">JMD</InputAdornment>,
                }}
              />
              <TextField
                label="Password"
                size="small"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                required
                style={{ marginBottom: 10 }}
                error={!!formErrors.password}
                helperText={formErrors.password}
              />
              <TextField
                label="Re-enter Password"
                size="small"
                fullWidth
                type="password"
                value={rePassword}
                onChange={(e) => handleRePasswordChange(e.target.value)}
                required
                style={{ marginBottom: 10 }}
                error={!!formErrors.rePassword}
                helperText={formErrors.rePassword}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ marginTop: 10, width:'100%' }} // Add any custom styles here
            >
              Sign Up
            </Button>
            <span>Already a User?<span id="signin" onClick={() => navigate("/")}> Sign-In</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};
