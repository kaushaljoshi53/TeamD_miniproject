import  { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../styles/AddProject.css';
import { MdSave, MdEdit,MdDelete } from 'react-icons/md';

interface Project {
  project_id: string;
  projectName: string;
  startDate: string;
  endDate: string;
  teamLeader: string;
  teamMembers: string[];
  status: string;
}

 

export default function BasicAccordion() {
  const [projectData, setProjectData] = useState<Project[]>([]);
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [teamLeader, setTeamLeader] = useState('');
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [newTeamMember, setNewTeamMember] = useState<string>('');
  const [status, setStatus] = useState('');
  const [isProjectVisible, setIsProjectVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [editedProject, setEditedProject] = useState<Project | null>(null);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editedRowData, setEditedRowData] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false);

  const toggleProjectVisibility = () => {
    setIsProjectVisible(!isProjectVisible);
    setEditedProject(null);
    clearForm();
  };

  const handleEditProject = (projectId: string) => {
    const projectToEdit = projectData.find((project:any) => project.project_id === projectId);
    if (projectToEdit) {
      setEditedProject(projectToEdit);
      setIsEditFormVisible(true);
    }
  };

  const handleSaveEdit = () => {
    if (editedProject) {
      const updatedProjectData = projectData.map((project:any) =>
        project.project_id === editedProject.project_id ? editedProject : project
      );
      setProjectData(updatedProjectData);
      setEditedProject(null);
      clearForm();
      setIsEditFormVisible(false);
    }
  };

 

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      projectName.trim() === '' ||
      startDate.trim() === '' ||
      endDate.trim() === '' ||
      teamLeader.trim() === '' ||
      teamMembers.length === 0 ||
      status.trim() === ''
    ) {
      alert('All fields are required.');
      return;
    }

    const currentDate = new Date();
    const selectedStartDate = new Date(startDate);
    const selectedEndDate = new Date(endDate);

    if (selectedStartDate <= currentDate) {
      alert('Start date should be a future date.');
      return;
    }

    if (selectedEndDate <= selectedStartDate) {
      alert('End date should be after the start date.');
      return;
    }

    if (editedProject) {
      handleSaveEdit();
    } else {
      const newProject: Project = {
        project_id: Date.now().toString(),
        projectName,
        startDate,
        endDate,
        teamLeader,
        teamMembers,
        status,
      };
      setProjectData([...projectData, newProject]);
      clearForm();
      setIsProjectVisible(false);
    }
  };

 

  const addTeamMember = () => {
    if (newTeamMember.trim() !== '') {
      const updatedTeamMembers = [...teamMembers, newTeamMember];
      setTeamMembers(updatedTeamMembers);
      setNewTeamMember('');
    }
  };

 

  const deleteTeamMember = (index: number) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers.splice(index, 1);
    setTeamMembers(updatedTeamMembers);
  };

 

  const clearForm = () => {
    setProjectName('');
    setStartDate('');
    setEndDate('');
    setTeamLeader('');
    setTeamMembers([]);
    setStatus('');
  };

 

  useEffect(() => {
    const filtered = projectData.filter((project:any) =>
      project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchQuery, projectData]);

  const handleDeleteProjectConfirmation = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteConfirmationVisible(true);
  };


  const handleConfirmDelete = () => {
    if (projectToDelete) {
      const updatedProjectData = projectData.filter(
        (project:any) => project.project_id !== projectToDelete.project_id
      );
      setProjectData(updatedProjectData);
      setIsDeleteConfirmationVisible(false);
    }
  };

  return (

    <div className="accordion-container">

      <Accordion className="Project">


        <AccordionDetails>

          <Typography>

            <div className="accordion-body">

              <input

                type="text"
                className='search-box'
                placeholder="Search by Project Name"

                value={searchQuery}

                onChange={(e) => setSearchQuery(e.target.value)}

              />

              <button className="projectadd" onClick={toggleProjectVisibility}>

                ADD

              </button>

              <div className={`form-containers ${isProjectVisible ? 'active' : ''}`}>

                {isProjectVisible && (

                  <div className="popup-overlay">

                    <div className="popup-form">

                      <div className="form-containers">

                        <div className="close-buttons" onClick={toggleProjectVisibility}>

                          <span className="close-marks">&times;</span>

                        </div>

                        <form className="formdetailss" onSubmit={handleSubmit}>

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

                                  <div className="delete-btn">

                                    <MdDelete onClick={() => deleteTeamMember(index)}/>

                                  </div>

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

                                <button className="butonclr" type="button" onClick={addTeamMember}>

                                  +

                                </button>

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

                              <option className="values" value="">

                                Select an option

                              </option>

                              <option className="values" value="Inprogress">

                                In progress

                              </option>

                              <option className="values" value="Completed">

                                Completed

                              </option>

                            </select>

                          </div>

                          <div className="form-group">

                            <button className="add-event-button" type="submit">

                              Submit

                            </button>

                          </div>

                        </form>

                      </div>

                    </div>

                  </div>

                )}

              </div>

              <div className="table-container">

                <table className="project-table">

                  <thead>

                    <tr>

                      <th>Project_Id</th>

                      <th>Project Name</th>

                      <th>Start Date</th>

                      <th>End Date</th>

                      <th>Team Leader</th>

                      <th>Team Members</th>

                      <th>Status</th>

                      <th>Edit</th>

                      <th>Delete</th>


                    </tr>

                  </thead>

                  <tbody>

                  {filteredProjects.map((project: Project) => (
                      <tr key={project.project_id}>
                        <td>{project.project_id}</td>
                        <td>
                          {editedProject && editedProject.project_id === project.project_id && isEditFormVisible ? (
                            <input
                              type="text"
                              value={editedProject.projectName}
                              onChange={(e) =>
                                setEditedProject({
                                  ...editedProject,
                                  projectName: e.target.value,
                                })
                              }
                            />
                          ) : (
                            project.projectName
                          )}
                        </td>

                        <td>

                          {editedProject && editedProject.project_id === project.project_id && isEditFormVisible ? (

                            <input

                              type="date"

                              value={editedProject.startDate}

                              onChange={(e) =>

                                setEditedProject({

                                  ...editedProject,

                                  startDate: e.target.value,

                                })

                              }

                            />

                          ) : (

                            project.startDate

                          )}

                        </td>

                        <td>

                          {editedProject && editedProject.project_id === project.project_id && isEditFormVisible ? (

                            <input

                              type="date"

                              value={editedProject.endDate}

                              onChange={(e) =>

                                setEditedProject({

                                  ...editedProject,

                                  endDate: e.target.value,

                                })

                              }

                            />

                          ) : (

                            project.endDate

                          )}

                        </td>

                        <td>

                          {editedProject && editedProject.project_id === project.project_id && isEditFormVisible ? (

                            <input

                              type="text"

                              value={editedProject.teamLeader}

                              onChange={(e) =>

                                setEditedProject({

                                  ...editedProject,

                                  teamLeader: e.target.value,

                                })

                              }

                            />

                          ) : (

                            project.teamLeader

                          )}

                        </td>

                        <td>

                          {editedProject && editedProject.project_id === project.project_id && isEditFormVisible ? (

                            <div>

                              {editedProject.teamMembers.map((member: string, index: number) => (

                                <div className="form-group" key={index}>

                                  <label htmlFor={`teamMember${index}`}>Team Member:</label>

                                  <div className="input-button-container">

                                    <input

                                      type="text"

                                      id={`teamMember${index}`}

                                      name={`teamMember${index}`}

                                      value={member}

                                      onChange={(e) => {

                                        const updatedTeamMembers = [...editedProject.teamMembers];

                                        updatedTeamMembers[index] = e.target.value;

                                        setEditedProject({

                                          ...editedProject,

                                          teamMembers: updatedTeamMembers,

                                        });

                                      }}

                                    />

                                    <div className="delete-btn">

                                    <MdDelete onClick={() => deleteTeamMember(index)}/>

                                    </div>

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

                                  <button

                                    className="butonclr"

                                    type="button"

                                    onClick={addTeamMember}

                                  >

                                    +

                                  </button>

                                </div>

                              </div>

                            </div>

                          ) : (

                            project.teamMembers.join(', ')

                          )}

                        </td>

                        <td>

                          {editedProject && editedProject.project_id === project.project_id && isEditFormVisible ? (

                            <input

                              type="text"

                              value={editedProject.status}

                              onChange={(e) =>

                                setEditedProject({

                                  ...editedProject,

                                  status: e.target.value,

                                })

                              }

                            />

                          ) : (

                            project.status

                          )}

                        </td>

                        <td>

                            <button className='table-change-edit' onClick={() => handleEditProject(project.project_id)} >Edit</button>


                        </td>
                        <td>

                          <button className='table-change-delete' onClick={() => handleDeleteProjectConfirmation(project)} >Delete</button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>



  <div className={`form-containers ${isEditFormVisible ? 'active' : ''}`}>
  {isEditFormVisible && editedProject && (
    <div className="popup-overlay">
      <div className="popup-form edit-confirmation">
        <div className="cross-buttons" onClick={() => setIsEditFormVisible(false)}>
          <span className="cross-marks">&times;</span>
        </div>
        <form className="formdetailss" onSubmit={handleSaveEdit}>
          <div className="form-group">
            <label htmlFor="projectName">Project Name:</label>
            <input
              type="text"
              value={editedProject.projectName}
              onChange={(e) =>
                setEditedProject({
                  ...editedProject,
                  projectName: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              value={editedProject.startDate}
              onChange={(e) =>
                setEditedProject({
                  ...editedProject,
                  startDate: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              value={editedProject.endDate}
              onChange={(e) =>
                setEditedProject({
                  ...editedProject,
                  endDate: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="TeamLeader">Team Leader:</label>
            <input
              type="text"
              value={editedProject.teamLeader}
              onChange={(e) =>
                setEditedProject({
                  ...editedProject,
                  teamLeader: e.target.value,
                })
              }
            />
          </div>

          <div>
  {editedProject.teamMembers.map((member: string, index: number) => (
    <div className="form-group" key={index}>
      <label htmlFor={`teamMember${index}`}>Team Member:</label>
      <div className="input-button-container">
        <input
          type="text"
          id={`teamMember${index}`}
          name={`teamMember${index}`}
          value={member}
          onChange={(e) => {
            const updatedTeamMembers = [...editedProject.teamMembers];
            updatedTeamMembers[index] = e.target.value;
            const updatedEditedProject = {
              ...editedProject,
              teamMembers: updatedTeamMembers,
            };
            setEditedProject(updatedEditedProject);
          }}
        />
        <div className="delete-btn">
          <MdDelete onClick={() => deleteTeamMember(index)} />
        </div>
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
      <button className="butonclr" type="button" onClick={addTeamMember}>
        +
      </button>
    </div>
  </div>
</div>


          <div className="form-group">
            <label htmlFor="Projectstatus">Project Status:</label>
            <input
              type="text"
              value={editedProject.status}
              onChange={(e) =>
                setEditedProject({
                  ...editedProject,
                  status: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <button className="add-event-button" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>

<div className={`form-containers ${isDeleteConfirmationVisible ? 'active' : ''}`}>
{isDeleteConfirmationVisible && (
        <div className="popup-overlay">
          <div className="popup-form delete-confirmation">
            <div className="confirmation-message">
              Are you sure you want to delete this project?
            </div>
            <div className="confirmation-buttons">
              <Button
                className='red-del'
                variant="contained"
                color="secondary"
                onClick={handleConfirmDelete}
              >
                Delete
              </Button>
              <Button
                className='vage-del'
                variant="contained"
                // color="default"
                onClick={() => setIsDeleteConfirmationVisible(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>

</div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

 

 