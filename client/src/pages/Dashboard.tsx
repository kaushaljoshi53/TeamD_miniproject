import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Dashboard.css';
import { IconButton } from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';
import PublicHoliday from '../components/publicHoliday';
import Birthday from '../components/Birthday';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export const Dashboard: React.FC = () => {
    const today: String = new Date().toDateString();
    const todayDate = new Date();
    // Sample data: Birthdays with names and designations for demonstration purposes
    interface Person {
        name: string;
        designation: string;
        birthdate: Date;
    }
    const birthdays: Person[] = [
        { name: 'Kaushal', designation: 'Developer', birthdate: new Date(2000, 8, 12) },
        { name: 'Vivek', designation: 'Designer', birthdate: new Date(1995, 3, 15) },
        { name: 'Romika', designation: 'Software Engineer', birthdate: new Date(2002, 9, 8) },
        { name: 'Divya', designation: 'Software Intern', birthdate: new Date(2003, 8, 8) },
        { name: 'Vishal', designation: 'Software Intern', birthdate: new Date(2003, 8, 8) },
        { name: 'Thirulogachander', designation: 'Software Intern', birthdate: new Date(2003, 8, 8) },
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
                    <div className='Pholiday'>
                        <PublicHoliday />
                    </div>
                    <p>
                        <span>{today}</span>
                        <span>
                            <IconButton onClick={toggleBirthday} id="bday" className='dob'>
                                <CakeIcon sx={{
                                    color: "#19105B",
                                    transform: "translateY(-5px)",
                                }} />
                            </IconButton>
                        </span>
                        {isBirthdayIconClicked ? (
                            todayBirthdays.length > 0 ? (
                                <div className="birthday-card-container birthday-grid-container">
                                    {todayBirthdays.map((person, index) => (
                                        <Card key={index} className="birthday-card" style={{ maxWidth: '900px', height: 'autoContent' }}>
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
                                <Card className="birthday-card" style={{ maxWidth: '900px' }}>
                                <CardContent>
                                    <div>
                                        <h2 className='moving-text'>Today's Birthday</h2>
                                        <p>No Cakes and Candles.</p>
                                    </div>
                                </CardContent>
                            </Card>
                            )
                        ) : null}
                    </p>
                </div>
            </div>
        </div>
    );
};
