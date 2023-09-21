// Dashboard.tsx
import Sidebar from '../components/Sidebar';
import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Typography,
} from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';
import AdminProjectAllocation from '../components/AdminProjectAllocation';
import AdminEventCard from '../components/AdminEventsCard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BirthdayCard from '../components/Birthdays';
import HolidayCard from '../components/HolidayCard';
import { BirthdayPerson } from '../components/Birthdays';
import { api } from '../services/Apis';
import { ToastContainer } from "react-toastify";
import { useAuthCheck } from '../utils/useAuthCheck';
import projectsData from '../models/ProjectsData';
import EventForm from '../components/EventsForm';
import {projectApi} from '../services/ProjectApis';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {

  useAuthCheck();

  const navigate = useNavigate();

  const today: string = new Date().toDateString();

  const [isFormVisible, setFormVisible] = useState(false);
  const [birthdays, setBirthdays] = useState<BirthdayPerson[]>([]);
  const [projects, setProjects] = useState<any[]>([])

  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  const demoData: any[] = [];

  useEffect(() => {
    async function fetchData() {
      const birthdayPerson = await api.getBirthdayPerson();
      setBirthdays(birthdayPerson)

      const projects = await projectApi.getProjects(); 
      if (projects === "Not Logged In"){
        navigate('/');

      setProjects(projects);
      }
    };
    fetchData()

  }, []);


  return (
    <div className="dashboard">
      <div className="sidebar">
        <Sidebar name='Kaushal' image='Kaushal Joshi' />
      </div>
      <div className="main">
        <ToastContainer />
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
                sx={{ backgroundColor: '#19015B', color: 'whitesmoke' }}
              >
                <Typography >Projects Allocated</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0, maxHeight: 250, overflow: 'hidden', overflowY: 'scroll' }}>
                <Typography>
                  <AdminProjectAllocation projects={demoData} />
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
                    <AdminEventCard />
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
                    <HolidayCard />
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


export default AdminDashboard;