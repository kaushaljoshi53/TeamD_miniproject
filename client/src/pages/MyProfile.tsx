import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { ImagetoBase64 } from "../components/ImagetoBase64";
import "../styles/MyProfile.css";
import Sidebar from "../components/Sidebar";

const jinlogo = require("../assets/images/jin-logo.png")

export const MyProfile = () => {

  const [data, setData] = useState({
    
  });

  const handleUploadProfileImage = async (e:any) => {
    const data = await ImagetoBase64(e.target.files[0]);
    console.log(data);
    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  const [isVisible, setisVisible] = useState(false);
  const toggle = () => {
    setisVisible(!isVisible);
  };
  return (
 
      <div className="m-0 p-0"> {/*body*/}
        {/* sidebar */}
        <Sidebar/>
        {/* sidebar */}

        {/* content */}
        <div className="content">
          <div className="content-head w-100">
            <h1>Profile Page</h1>
          </div>

          {/* main card */}
          <div className="card" id="dashboard">
            <div className="info-div-head">
              <h3 className="m-0 m-auto">
                My Information
                <BsChevronDown className="mr-4" />
              </h3>
            </div>

            <div className="info-content">
              <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md relative ml-8 mt-6">
                <img
                  src={jinlogo}
                  className="w-full h-full"
                />
                <label htmlFor="profileImage">
                  <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-60 w-full text-center">
                    <p className="text-sm p-1 text-white">Upload</p>
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
              {/* Img content */}
              <div className="fixed-content space-y-1">
                <p>Vishal Verma</p>
                <p>JMD240</p>
                <p>Software Engineer</p>
              </div>
              {/* main card*/}
            </div>

            {/*second card*/}
            <div className="sec-card" >
              <h3 className="m-0 ml-6 m-auto"onClick={toggle}>
                Update Details
                <BsChevronDown
                  className={`mr-4 transition-transform transform ${
                    isVisible ? "rotate-180" : ""
                  }`}
                />
              </h3>
              {isVisible && (
                <div className="p-datatable-wrapper">
                  <div>
                    <table className="p-datatable-table w-full overflow-x-auto">
                      <thead className="p-datatable-thead ">
                        <tr className="table-row">
                          <th className="datatable-column">Details Name</th>
                          <th className="datatable-column">Details Value</th>
                        </tr>
                      </thead>
                      <tbody className="p-datatable-tbody text-center">
                        <tr className="table-row">
                          <td className="datatable-column-style">
                            <div>
                              <p className="cell-head">Organizational Email</p>
                            </div>
                          </td>
                          <td className="datatable-column-style">
                            <div>
                              <input
                                type={"text"}
                                id="Name"
                                name="Name"
                                required
                                className="profile bg-slate-200 focus-within:outline-blue-300"
                                placeholder="vishalverma@jmangroup.com"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr className="table-row">
                          <td className="datatable-column-style">
                            <div>
                              <p className="cell-head">Birth Day</p>
                            </div>
                          </td>
                          <td className="datatable-column-style">
                            <div>
                              <input
                                type={"date"}
                                id="date"
                                name="date"
                                required
                                className="profile bg-slate-200 focus-within:outline-blue-300"
                                placeholder="01-01-2000"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr className="table-row">
                          <td className="datatable-column-style">
                            <div>
                              <p className="cell-head">JIN Password</p>
                            </div>
                          </td>
                          <td className="datatable-column-style">
                            <div>
                              <input
                                type={"password"}
                                id="Password"
                                name="Password"
                                required
                                className="profile bg-slate-200 focus-within:outline-blue-300"
                                placeholder="123456789"
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <button
                      type="submit"
                      className="btn-last max-w-[100px]"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

