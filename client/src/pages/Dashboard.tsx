import React from 'react';
import Sidebar from '../components/Sidebar';
import Event from '../components/Event';
import Project from '../components/Project';
import '../styles/Dashboard.css'
import { IconButton } from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';



export const Dashboard: React.FC = () => {

    const today: String = new Date().toDateString()



    return (
        <>
        <div className="Dashboard">
            <div className="Sidebar">
                <Sidebar />
            </div>
            <div className="main">
                <div className="header">
                    <h2>Dashboard</h2>
                    <p>
                        <span>
                            {today}
                        </span>
                        <span>
                            <IconButton>
                                <CakeIcon sx={{
                                    color: "#19105B",
                                    transform: "translateY(-5px)"
                                }} />
                            </IconButton>
                        </span>
                    </p>
                </div>
                <div className='event'>
                <Event />
                </div>
                <div className='project'>
                <Project />
                </div>
            </div>
        </div>
        </>
    )
}