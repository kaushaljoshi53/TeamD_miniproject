import React from "react";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import '../styles/Admin.css'
import AddEvent from "../components/AddEvent";
import AddProject from "../components/AddProject";




export const Admin: React.FC = () => {
    return (
        <>
        <Sidebar/>
       
        <AddProject/>
        </>
    

     
        
    )
}

export default Admin;