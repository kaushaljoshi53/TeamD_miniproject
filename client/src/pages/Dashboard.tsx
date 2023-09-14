// Dashboard.tsx

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Dashboard.css';
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Typography } from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';
import ProjectAllocation from '../components/ProjectAllocation';
import EventCard from '../components/EventsCard';



export const Dashboard: React.FC = () => {
  const today: String = new Date().toDateString();

  const [isFormVisible, setFormVisible] = useState(false);

  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };


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
            <span>
              <IconButton onClick={toggleForm}>
                <CakeIcon
                  sx={{
                    color: '#19105B',
                    transform: 'translateY(-5px)',
                  }}
                />
              </IconButton>
            </span>
          </p>
        </div>
        <div className="body">
          <div className="projectAllocation">
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ width: "100%" }}>
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" sx={{ backgroundColor: "#19015B", color: "whitesmoke" }}>
                <Typography>Project Allocation</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                <Typography sx={{ padding: 0, margin: 0 }}>
                  <ProjectAllocation />
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="events">
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{ width: "100%" }}>
              <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" sx={{ backgroundColor: "#19015B", color: "whitesmoke" }}>
                <Typography>Events</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                <Typography sx={{ padding: 0, margin: 0 }}>
                  <EventCard />
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="birthdays">
          </div>
        </div>
      </div>
    </div>
  );
};
