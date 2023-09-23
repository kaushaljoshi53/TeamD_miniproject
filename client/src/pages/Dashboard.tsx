import React from 'react';
import Sidebar from '../components/Sidebar';
import Event from '../components/Event';
import Project from '../components/Project';
import '../styles/Dashboard.css'
import { IconButton } from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';
import PublicHoliday from '../components/publicHoliday';
import { useState } from 'react';
import Birthday from '../components/Birthday';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import NewEvent from '../components/NewEvent';
import MyForm from '../components/Eventform';
import UserEvent from '../components/UaserEvent';



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
      { name: 'Kaushal', designation: 'Developer', birthdate: new Date(2000, 8, 12) },
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
                    {/* <p className='bday'>
                        <span>
                            {today}
                        </span>
                     <div className='bold'>
                        <span>
                        <IconButton onClick={toggleBirthday} id="bday" className='dob'>
                           <CakeIcon sx={{
                           color: "#19105B",
                          transform: "translateY(-5px)",
                            }} />
                       </IconButton>
                        </span> 
                        </div>  
                        <div className="dob">
                       
                            {isBirthdayIconClicked ? (
                                todayBirthdays.length > 0 ? (
                                    <div className="birthday-card-container">
                                    {todayBirthdays.map((person, index) => (
                                       <Card key={index} className="birthday-card" style={{ width: '300px', height: '200px' }}>
                                       <CardContent>
                                           <div className="profile-container">
                                               <img src="assets/images/profile.png" alt="profile" style={{ maxWidth: 50 }} />
                                               <div className="details">
                                                   <Typography component="div">
                                                       <div className="name">{person.name}</div>
                                                       <div className="designation">{person.designation}</div>
                                                  </Typography>
                                               </div>
                                          </div>
                                       </CardContent>
                                   </Card>
                                    ))}

                                </div>
                                ) : (
                                    <div>
                                        <h2 className='moving-text'>Today's Birthday</h2>
                                    <p>No Cakes and Candles.</p>
                                    </div>
                                )
                            ) : null} 
                        </div>        
                    </p> */}
                </div>
                <div className='birth'>
                <p className='bday'>
                        <span>
                            {today}
                        </span>
                     <div className='bold'>
                        <span>
                        <IconButton onClick={toggleBirthday} id="bday" className='dob'>
                           <CakeIcon sx={{
                           color: "#19105B",
                          transform: "translateY(-5px)",
                            }} />
                       </IconButton>
                        </span> 
                        </div>  
                        <div className="dob">
                       
                            {isBirthdayIconClicked ? (
                                todayBirthdays.length > 0 ? (
                                    <div className="birthday-card-container">
                                    {todayBirthdays.map((person, index) => (
                                       <Card key={index} className="birthday-card" style={{ maxWidth: '300px', height: 'autoContent' }}>
                                       <CardContent>
                                           <div className="profile-container">
                                               <img src="assets/images/profile.png" alt="profile" style={{ maxWidth: 50 }} />
                                               <div className="details">
                                                   <Typography component="div">
                                                       <div className="name">{person.name}</div>
                                                       <div className="designation">{person.designation}</div>
                                                  </Typography>
                                               </div>
                                          </div>
                                       </CardContent>
                                   </Card>
                                    ))}

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
                <div className='project'>
                    <NewEvent />
                </div>
                <div className='project'>
                    <UserEvent />
                </div>
                {/* <div className='event'>
                    <Event />
                    <div className='holiday'>
                        <PublicHoliday />
                    </div>
                </div> */}
                {/* <div className='project'>
                    <Project />
                </div> */}
                <div className='project'>
                    <MyForm />
                </div>
            </div>
        </div>    
       
   
    )
}