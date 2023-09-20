import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Card, CardContent, IconButton, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export interface BirthdayPerson {
  name: string;
  designation: string;
  imageUrl: string;
}

interface Props {
  birthdays: BirthdayPerson[];
}

const BirthdayCard: React.FC<Props> = ({ birthdays }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextBirthday = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % birthdays.length);
  };

  const prevBirthday = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? birthdays.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextBirthday, 2000); // Change slide every 5 seconds (5000 milliseconds)

    return () => {
      clearInterval(interval); // Cleanup the interval when the component unmounts
    };
  }, []);

  const activePerson = birthdays[activeIndex];

  return (
    <div className="birthdayCard">
      <Paper elevation={14} style={{ width: 300, textAlign: 'center', backgroundColor: '#FFE5EE',color:'#19015B', margin: '0 auto', position: 'fixed', right:"1%",top:"7%", zIndex:7}}>
        <CardContent>
          <Avatar
            style={{ width: 75, height: 75, margin: '0 auto' }}
            alt={activePerson?.name}
            src={activePerson?.imageUrl}
          />
          <Typography variant="h5">{activePerson?.name}</Typography>
          <Typography variant="subtitle1">{activePerson?.designation}</Typography>
        </CardContent>
        <div style={{ position: 'absolute', bottom: 0, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <IconButton onClick={prevBirthday} style={{ backgroundColor: 'transparent', color: 'white' }}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton onClick={nextBirthday} style={{ backgroundColor: 'transparent', color: 'white' }}>
            <ArrowForwardIcon />
          </IconButton>
        </div>
      </Paper>
    </div>
  );
};

export default BirthdayCard;
