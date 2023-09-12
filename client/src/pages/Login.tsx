import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../styles/Login.css";

const jinlogo = require("../assets/images/jin-logo.png")
const mainlogo = require("../assets/images/mainlogo.png")

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();


  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
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
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
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
      toast(val.message);
      if (val.alert) {
        // dispatch(loginRedux(val));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        alert("Invalid Credentials");
        setData(() => {
          return {
            email: "",
            password: "",
          };
        });
      }
    } else {
      alert("Please Enter required fields");
    }
  };
  return (
    <div className="p-0 md:4 bg-white flex holder">
      <div className="img_div flex-none w-1/2 h-screen">
        <img src={mainlogo} className="h-full" />
      </div>

      <div className="form_box max-w-sm  bg-slate-400 m-auto mb-18 flex flex-col p-12">
        <div className="form-img drop-shadow-md shadow-md ">
          <img src={jinlogo} className="w-full h-full" />
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

          <label htmlFor="password">Password</label>
          <div className="sens flex bg-slate-200 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              className=" w-full bg-slate-200 border-none outline-none "
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

          <button
            type="submit"
            className="btn m-auto max-w-[135px] mt-4"
          >
            Login
          </button>
        </form>

        <p className="foot">
          New User!! ?{" "}
          <Link
            to={"/signup"}
            className="link"
          >
            Signup
          </Link>
        </p>
        <p className="foot">
          Forget Password?{" "}
          <Link
            to={"/forget_password"}
            className="link"
          >
            Forget Password
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
