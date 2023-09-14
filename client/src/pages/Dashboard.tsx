// Dashboard.tsx

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Dashboard.css';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Typography,
} from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';
import ProjectAllocation from '../components/ProjectAllocation';
import EventCard from '../components/EventsCard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BirthdayCard from '../components/Birthdays';
import { BirthdayPerson } from '../components/Birthdays';
import { api } from '../services/Apis';

export const Dashboard: React.FC = () => {
  const today: string = new Date().toDateString();

  const [isFormVisible, setFormVisible] = useState(false);
  const [birthdays, setBirthdays] = useState<BirthdayPerson[]>([]);

  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  useEffect(() => {
    async function fetchData() {
      const birthdayPerson = await api.getBirthdayPerson()
      setBirthdays(birthdayPerson)
    };
    fetchData()

  }, []);

  return (
    <div className="dashboard">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main">
        <div className="header">
          <h2>Dashboard</h2>
          <p>
            <span>{today}</span>
            {birthdays.length > 0 && (
              <span>
                <IconButton onClick={toggleForm}>
                  <CakeIcon
                  className='cakeIcon'
                    sx={{
                      color: '#19105B',
                      transform: 'translateY(-5px)',
                    }}
                  />
                </IconButton>
              </span>
            )}
            {isFormVisible && <BirthdayCard birthdays={birthdays} />}
          </p>
        </div>
        <div className="body">
          <div className="projectAllocation">
            <Accordion sx={{ width: '100%' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'whitesmoke' }} />}
                sx={{ backgroundColor: '#19015B', color: 'whitesmoke'}}
              >
                <Typography >Projects Allocated</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0, maxHeight: 650, overflow: 'hidden', overflowY: 'scroll' }}>
                <Typography>
                  <ProjectAllocation />
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>

          <div className="lower">
            <div className="events">
              <Accordion sx={{ width: '100%' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: 'whitesmoke' }} />}
                  sx={{ backgroundColor: '#19015B', color: 'whitesmoke' }}
                >
                  <Typography>Upcoming Events</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0, maxHeight: 200, overflow: 'hidden', overflowY: 'scroll' }}>
                  <Typography>
                    <EventCard />
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>

            <div className="holidays">
              <Accordion sx={{ width: '100%' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: 'whitesmoke' }} />}
                  sx={{ backgroundColor: '#19015B', color: 'whitesmoke' }}
                >
                  <Typography>Upcoming Holidays</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0, maxHeight: 200, overflow: 'hidden', overflowY: 'scroll' }}>
                  <Typography>
                    <EventCard />
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
