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
import HolidayCard from '../components/HolidayCard';
import { BirthdayPerson } from '../components/Birthdays';
import { api } from '../services/Apis';
import { ToastContainer } from "react-toastify";
import { useAuthCheck } from '../utils/useAuthCheck';
import projectsData from '../models/ProjectsData';

const Dashboard: React.FC = () => {

  useAuthCheck();


  const today: string = new Date().toDateString();

  const [isFormVisible, setFormVisible] = useState(false);
  const [birthdays, setBirthdays] = useState<BirthdayPerson[]>([]);
  const [projects, setProjects] = useState<projectsData[]>([]);
  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  useEffect(() => {
    async function fetchData() {
      const birthdayPerson = await api.getBirthdayPerson();
      setBirthdays(birthdayPerson)
      const dashboard:any = await api.getUserDashboard();
    };
    fetchData()

  }, []);


  const demoData: projectsData[] = [
    {
      projectName: 'Project 1',
      projectStartDate: { day: 1, month: 1, year: 2023 },
      projectEndDate: { day: 31, month: 12, year: 2023 },
      allocationStartDate: { day: 5, month: 1, year: 2023 },
      allocationEndDate: { day: 15, month: 12, year: 2023 },
      projectManager: 'John Doe',
      approver: 'Alice Smith',
      allocationStatus: 'Active',
      projectStatus: 'In Progress',
      resources: [
        {
          name: 'Resource 1',
          approver: 'Manager 1',
          allocationStartDate: { day: 10, month: 1, year: 2023 },
          allocationEndDate: { day: 30, month: 11, year: 2023 },
          allocationStatus: 'Active',
        },
        // Add more resources as needed
      ],
    },
    {
      projectName: 'Project 2',
      projectStartDate: { day: 15, month: 2, year: 2023 },
      projectEndDate: { day: 10, month: 11, year: 2023 },
      allocationStartDate: { day: 20, month: 3, year: 2023 },
      allocationEndDate: { day: 25, month: 10, year: 2023 },
      projectManager: 'Jane Smith',
      approver: 'Bob Johnson',
      allocationStatus: 'Inactive',
      projectStatus: 'Completed',
      resources: [
        {
          name: 'Resource 2',
          approver: 'Manager 2',
          allocationStartDate: { day: 5, month: 4, year: 2023 },
          allocationEndDate: { day: 15, month: 9, year: 2023 },
          allocationStatus: 'Active',
        },
        // Add more resources as needed
      ],
    },
    {
      projectName: 'Project 3',
      projectStartDate: { day: 10, month: 4, year: 2023 },
      projectEndDate: { day: 20, month: 11, year: 2023 },
      allocationStartDate: { day: 15, month: 5, year: 2023 },
      allocationEndDate: { day: 10, month: 10, year: 2023 },
      projectManager: 'Sarah Johnson',
      approver: 'David Smith',
      allocationStatus: 'Active',
      projectStatus: 'In Progress',
      resources: [
        {
          name: 'Resource 3',
          approver: 'Manager 3',
          allocationStartDate: { day: 1, month: 6, year: 2023 },
          allocationEndDate: { day: 30, month: 9, year: 2023 },
          allocationStatus: 'Active',
        },
        // Add more resources as needed
      ],
    },
    {
      projectName: 'Project 4',
      projectStartDate: { day: 5, month: 2, year: 2023 },
      projectEndDate: { day: 15, month: 12, year: 2023 },
      allocationStartDate: { day: 10, month: 3, year: 2023 },
      allocationEndDate: { day: 25, month: 11, year: 2023 },
      projectManager: 'Michael Brown',
      approver: 'Jennifer Lee',
      allocationStatus: 'Inactive',
      projectStatus: 'Completed',
      resources: [
        {
          name: 'Resource 4',
          approver: 'Manager 4',
          allocationStartDate: { day: 1, month: 4, year: 2023 },
          allocationEndDate: { day: 15, month: 9, year: 2023 },
          allocationStatus: 'Active',
        },
        // Add more resources as needed
      ],
    },
    {
      projectName: 'Project 5',
      projectStartDate: { day: 8, month: 6, year: 2023 },
      projectEndDate: { day: 25, month: 11, year: 2023 },
      allocationStartDate: { day: 12, month: 7, year: 2023 },
      allocationEndDate: { day: 20, month: 10, year: 2023 },
      projectManager: 'Mark Davis',
      approver: 'Emily Wilson',
      allocationStatus: 'Active',
      projectStatus: 'In Progress',
      resources: [
        {
          name: 'Resource 5',
          approver: 'Manager 5',
          allocationStartDate: { day: 5, month: 8, year: 2023 },
          allocationEndDate: { day: 30, month: 9, year: 2023 },
          allocationStatus: 'Active',
        },
        // Add more resources as needed
      ],
    }
  ];
  


  return (
    <div className="dashboard">
      <div className="sidebar">
        <Sidebar name='Kaushal' image='Kaushal Joshi' />
      </div>
      <div className="main">
        <ToastContainer/>
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
              <AccordionDetails sx={{ padding: 0, maxHeight: 250, overflow: 'hidden', overflowY: 'scroll' }}>
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
                    <HolidayCard/>
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


export default Dashboard;