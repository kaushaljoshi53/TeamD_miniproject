import React from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Dashboard.css'
import { IconButton } from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';
import PublicHoliday from '../components/publicHoliday';
import { useState } from 'react';
import Birthday from '../components/Birthday';


export const Dashboard: React.FC = () => {
    const today: String = new Date().toDateString()
    const todayDate = new Date();
    // Sample data: Birthdays with names and designations for demonstration purposes
    interface Person {
      name: string;
      designation: string;
      birthdate: Date;
    };
    const birthdays:Person[]= [
      { name: 'Kaushal', designation: 'Developer', birthdate: new Date(2000, 8, 11) },
      { name: 'Vivek', designation: 'Designer', birthdate: new Date(1995, 3, 15) },
      {name:'Romika',designation:'softwareEngineer',birthdate:new Date(2002,9,8)},
      {name:'Divya',designation:'software intern',birthdate:new Date(2003,8,8)},
      {name:'Vishal',designation:'software intern',birthdate:new Date(2003,8,8)},
      {name:'Thirulogachander',designation:'software intern',birthdate:new Date(2003,8,8)},
      // Add more birthdays here
    ];
    // Find whose birthday is today
    const todayBirthdays = birthdays.filter(
      (person) =>
        person.birthdate.getDate() === todayDate.getDate() &&
        person.birthdate.getMonth() === todayDate.getMonth()
    );
  
    const [isBirthdayIconClicked, setIsBirthdayIconClicked] = useState(false);
    function toggleBirthday() {
      setIsBirthdayIconClicked(!isBirthdayIconClicked);
    } 
    return (
        <div className="Dashboard">
            <div className="Sidebar">
                <Sidebar />
            </div>           
            <div className="main">
                <div className="header">
                    <h2>Dashboard</h2>
                    <div>
                <PublicHoliday/>
            </div>
                    <p>
                        <span>
                            {today}
                        </span>
                     
                        <span>
                        <IconButton onClick={toggleBirthday} id="bday" className='dob'>
                           <CakeIcon sx={{
                           color: "#19105B",
                          transform: "translateY(-5px)",
                            }} />
                       </IconButton>
                        </span>   
                        <div className="dob">
                       
                            {isBirthdayIconClicked ? (
                                
                                todayBirthdays.length > 0 ? (
                                    
                                    <div className="names">
                                        <Birthday person={todayBirthdays} />
                                    </div>
                                ) : (
                                    <div>
                                        <h2 className='moving-text'>Today's Birthday</h2>
                                    <p>No Cakes and Candles.</p>
                                    </div>
                                )
                            ) : null} 
                            </div>        
                    </p>
                    </div>
                </div>
            </div>
       
    );
    
}