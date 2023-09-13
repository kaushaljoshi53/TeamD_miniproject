import React, { useState } from "react";
import { BiShow, BiHide, BiLock } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Signup.css";
import { ImagetoBase64 } from "../components/ImagetoBase64";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../models/Userdata'

const jinlogo = require("../assets/images/jin-logo.png")
const mainlogo = require("../assets/images/mainlogo.png")


export function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    Name: "",
    EmployeeID: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
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

  const handleUploadProfileImage = async (e:any) => {
    const data = await ImagetoBase64(e.target.files[0]);

    setData((preve:any) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { Name, EmployeeID, email, password, confirmPassword } = data;
  
    if ((Name || EmployeeID) && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_DOMAIN}/signup`,
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
        toast.error('Password and confirm password do not match!', {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    } else {
      toast.warning('Please enter required fields!', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  };
  return (
    <div className="p-0 md:4 bg-white flex holder">
      <div className="img_div flex-none md:w-1/2 md:h-screen w-full h-1/4">
        <img src={mainlogo} className="h-full" />
      </div>

      {/* form-box */}
      <div className="form_box max-w-md bg-slate-400 m-auto flex flex-col w-1/4 h-30 p-10">
        <div className="form-img drop-shadow-md shadow-md">
          <img
            src={data.image ? data.image : jinlogo}
            className="w-full h-full"
          />
          <label htmlFor="profileImage">
            <div className="img-div bg-slate-500 ">
              <p>Upload</p>
            </div>
            <input
              type={"file"}
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleUploadProfileImage}
            />
          </label>
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="Name">Name</label>
          <input
            type={"text"}
            id="Name"
            name="Name"
            required
            className="insens bg-slate-200  focus-within:outline-blue-300"
            value={data.Name}
            onChange={handleOnChange}
          />
          <label htmlFor="EmployeeID">EmployeeID</label>
          <input
            type={"text"}
            id="EmployeeID"
            name="EmployeeID"
            required
            className="insens bg-slate-200 focus-within:outline-blue-300"
            value={data.EmployeeID}
            onChange={handleOnChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            required
            pattern="^[A-Za-z0-9._-]+@jmangroup\.com$"
            className="insens bg-slate-200 focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <div className="sens bg-slate-200  focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              pattern="^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$"
              title="Password must contain at least 1 digit, 1 letter, 1 special character, and be at least 8 characters long."
              className="w-full bg-slate-200 border-none outline-none"
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="span text-xl"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="confirmpassword">Confirm Password</label>
          <div className="sens bg-slate-200 focus-within:outline focus-within:outline-blue-300">
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
            className="btn m-auto mt-4"
          >
            <BiLock className="bilock" />
            Create account
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

export default Signup;
