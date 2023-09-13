import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/Forget_Password.css";
import axios from 'axios';

const jinlogo = require("../assets/images/jin-logo.png")
const mainlogo = require("../assets/images/mainlogo.png")

export function Forget_Password() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
  };
  const handleOnChange = (e:any) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { email, password, confirmPassword } = data;
  
    if (email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_DOMAIN}/forget_password`,
            data,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
  
          const val = response.data;
          console.log(val);
          // alert(val.message);
          toast.success(val.message, {
            position: toast.POSITION.TOP_RIGHT,
          })
  
          if (val.alert) {
            navigate('/login');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        toast.error('Password and confirm password do not match', {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    } else {
      toast.warning('Please Enter required fields', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  };
    return (
    <div className="p-0 md:4 bg-white flex holder">
      <div className="img_div flex-none w-1/2 h-screen">
        <img src={mainlogo} className="h-full" />
      </div>

      <div className="form_box max-w-sm  bg-slate-400 m-auto mb-18 flex flex-col p-12">
        <div className="form-img drop-shadow-md shadow-md m-auto">
          <img
            src={jinlogo}
            className="w-full h-full"
          />
        </div>

        <form className="w-full py-3 flex flex-col " onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            required
            className="sens bg-slate-200 focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Create New Password</label>
          <div className="sens flex bg-slate-200 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              pattern="^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$"
              title="Password must contain at least 1 digit, 1 letter, 1 special character, and be at least 8 characters long."
              className=" w-full bg-slate-200 border-none outline-none "
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="span text-xl "
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="confirmpassword">Confirm Password</label>
          <div className="sens flex bg-slate-200 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmPassword"
              required
              className=" w-full bg-slate-200 border-none outline-none "
              value={data.confirmPassword}
              onChange={handleOnChange}
            />
            <span
              className="span text-xl"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button
            type="submit"
            className="btn max-w-[135px] mt-2"
          >
            Save Details
          </button>
        </form>

        <p className="foot">
          Already Registered User!! ?{" "}
          <Link
            to={"/login"}
            className="link"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Forget_Password;
