import React from "react";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import '../styles/Admin.css'
import AddEvent from "../components/AddEvent";



export const Admin: React.FC = () => {
    return (
        <>
        <Sidebar/>
        <AddEvent/>
        </>
    

     
        
    )
}

export default Admin;