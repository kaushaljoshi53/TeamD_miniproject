import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../styles/Project.css';
import axios, { Axios } from 'axios';

interface Project {
  project_id: string;
  project_name: string;
  start_date: string;
  end_date: string;
  team_leader: string;
  emp_id: string;
  status: string;
}



export default function BasicAccordion() {
  const [projectData, setProjectData] = useState<Project[]>([]);


  useEffect(() => {
    // Define an async function to fetch the data from your server
    async function fetchProjectData() {
      try {
        const response = await axios.get('http://localhost:8081/api/projects'); // Replace with your API endpoint
        const data = response.data;
        setProjectData(data); // Update the state with the fetched data
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    }

    fetchProjectData(); // Call the async function when the component mounts
  }, []); // The empty array [] as the second argument makes this effect run only once on mount

  return (
    <div className="accordion-container">
      <Accordion className="Project">
        <div className='project_header'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="expand-icon" />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="accordion-title">Project Allocation</Typography>
          </AccordionSummary>
        </div>
        <AccordionDetails>
          <Typography>
            <div className="accordion-body">
            <div className="table-container">
              <table className="project-table">
                <thead>
                  <tr>
                    <th>Project_Id</th>
                    <th>Project Name</th>
                    <th>Start_Date</th>
                    <th>End_Date</th>
                    <th>Team_Leader</th>
                    <th>Emp_Id</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {projectData.map((project) => (
                    <tr key={project.project_id} className="row-highlight">
                      <td>{project.project_id}</td>
                      <td>{project.project_name}</td>
                      <td>{project.start_date}</td>
                      <td>{project.end_date}</td>
                      <td>{project.team_leader}</td>
                      <td>{project.emp_id}</td>
                      <td>{project.status}</td>
                    </tr>
                  ))} */}
                  <td>Id1</td>
                  <td>Project1</td>
                  <td>22/09/2023</td>
                  <td>23/10/2023</td>
                  <td>Anu</td>
                  <td>24</td>
                  <td>In-progress</td>
                </tbody>
              </table>
            </div>
        </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
