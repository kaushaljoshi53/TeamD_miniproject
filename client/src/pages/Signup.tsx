import React, { useState } from "react";
import { BiShow, BiHide, BiLock } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "../styles/Signup.css";
import { ImagetoBase64 } from "../components/ImagetoBase64";

const jinlogo = require("../assets/images/jin-logo.png")
const mainlogo = require("../assets/images/mainlogo.png")


const signup = {
  Name: String,
  EmployeeID: String,
  email: String,
  password: String,
  confirmPassword: String,
  image: String,
};

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

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const { Name, email, password, confirmPassword } = data;
    if (Name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/signup`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const val = await fetchData.json();
        console.log(val);
        // alert(val.message);
        toast(val.message);
        if (val.alert) {
          navigate("/login");
        }
      } else {
        alert("Password and confirm password does not matched");
      }
      // }
    } else {
      alert("Please Enter required fields");
    }
  };
  return (
    <div className="p-0 md:4 bg-white flex holder">
      <div className="img_div flex-none w-1/2 h-screen">
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
            pattern="[.]+@jmangroup\.com"
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
