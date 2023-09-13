import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../styles/AddProject.css';
import axios, { Axios } from 'axios';
import AddIcon from '@mui/icons-material/Add';

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
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [teamLeader, setTeamLeader] = useState("");
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [newTeamMember, setNewTeamMember] = useState<string>('');
  const [status, setStatus] = useState("");
  const [isProjectVisible, setIsProjectVisible] = useState(false);

  
  const toggleProjectVisibility = () => {
    setIsProjectVisible(!isProjectVisible);
  };
  const currentDate = new Date().toISOString().split('T')[0];
  
  const handleCloseForms = () => {
    setIsProjectVisible(false);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const addTeamMember = () => {
    const updatedTeamMembers = [...teamMembers, newTeamMember];
    setTeamMembers(updatedTeamMembers);
    setNewTeamMember('');
  };

  const deleteTeamMember = (index: number) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers.splice(index, 1);
    setTeamMembers(updatedTeamMembers);
  };

  useEffect(() => {
    if (!isProjectVisible) {
      // Reset form fields
      setProjectName("");
      setStartDate("");
      setEndDate("");
      setTeamLeader("");
      setTeamMembers([]);
      setStatus("");

    }
  }, []);


  // useEffect(() => {
  //   // Define an async function to fetch the data from your server
  //   async function fetchProjectData() {
  //     try {
  //       const response = await axios.get('http://localhost:8081/api/projects'); // Replace with your API endpoint
  //       const data = response.data;
  //       setProjectData(data); // Update the state with the fetched data
  //     } catch (error) {
  //       console.error('Error fetching project data:', error);
  //     }

  //   }
  //   fetchProjectData();
  // }, []); 
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
            <AddIcon onClick={toggleProjectVisibility} className="plus-icon" />
            {isProjectVisible && (
              <div className="form-container">
                <div className="close-button" onClick={handleCloseForms}>
                  <span className="close-mark">&times;</span>
                </div>
                <form className='formdetails'>
                  <div className="form-group">
                    <label htmlFor="projectName">Project Name:</label>
                    <input
                      type="text"
                      id="projectName"
                      name="projectName"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="startDate">Project Start Date:</label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={currentDate}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="endDate">Project End Date:</label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={currentDate}
                    />
                  </div>


                  <div className="form-group">
                    <label htmlFor="teamLeaders">Team Leader:</label>
                    <input
                      type="text"
                      id="teamLeaders"
                      name="teamLeaders"
                      value={teamLeader}
                      onChange={(e) => setTeamLeader(e.target.value)}
                    />
                  </div>
                  <div>
                    {teamMembers.map((member: string, index: number) => (
                      <div className="form-group" key={index}>

                        <label htmlFor={`teamMember${index}`}>Team Member:</label>
                        <div className="input-button-container">
                          <input
                            type="text"
                            id={`teamMember${index}`}
                            name={`teamMember${index}`}
                            value={member}
                            onChange={(e) => {
                              const updatedTeamMembers = [...teamMembers];
                              updatedTeamMembers[index] = e.target.value;
                              setTeamMembers(updatedTeamMembers);
                            }}
                          />
                          <button onClick={() => deleteTeamMember(index)}>Delete</button>
                        </div>
                      </div>
                    ))}
                    <div className="form-group">
                      <label htmlFor="newTeamMember">Add Member:</label>
                      <div className="input-button-container">
                        <input

                          type="text"
                          id="newTeamMember"
                          name="newTeamMember"
                          value={newTeamMember}
                          onChange={(e) => setNewTeamMember(e.target.value)}
                        />
                        <button className="butonclr" type="button" onClick={addTeamMember}>+</button>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="Projectstatus">Project Status:</label>
                    <select
                      id="Projectstatus"
                      name="Projectstatus"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option className="values" value="">Select an option</option>
                      <option className="values" value="Inprogress">Inprogress</option>
                      <option className="values" value="Completed">Completed</option>

                    </select>
                  </div>

                  <form onSubmit={handleSubmit}>
            {/* Your input fields go here */}
            <button className="add-event-button" type="submit">
                Submit
            </button>
        </form>
                </form>
              </div>
            )}
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
                      <th>Team Member</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
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