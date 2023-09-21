import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from '@mui/material';
import { projectValidations } from '../utils/dataValidation';
import { ToastContainer,toast } from 'react-toastify';

function ProjectsForm() {
    const [projectName, setProjectName] = useState<string>('');
    const [projectManager, setProjectManager] = useState<string>('');
    const [projectStartDate, setProjectStartDate] = useState<string>('');
    const [projectEndDate, setProjectEndDate] = useState<string>('');
    const [projectStatus, setProjectStatus] = useState<string>('');
    const [resources, setResources] = useState<any[]>([]);

    const handleResourceChange = (index: number, field: string, value: string) => {
        const updatedResources = [...resources];
        updatedResources[index][field] = value;
        setResources(updatedResources);
    };

    const addResource = () => {
        setResources([...resources, { name: '', approverName: '', allocationStartDate: '', allocationEndDate: '', allocationStatus: '' }]);
    };

    const removeResource = (index: number) => {
        const updatedResources = [...resources];
        updatedResources.splice(index, 1);
        setResources(updatedResources);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // You can handle form submission logic here
        const projectData: any = {
            projectName,
            projectManager,
            projectStartDate,
            projectEndDate,
            projectStatus,
            resources,
        };
        const message = await projectValidations.addProject(projectData);
        if (message === 'Project Added Succesfully'){
            toast.success(message);
        }
        else{
            toast.error(message);
        }
    };

    return (
        <Container
            sx={{
                border: '1px solid #ccc',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                paddingBottom: '2%',
                marginTop: '0%',
                color: '#19015B',
                backgroundColor: 'white',
            }}
        >
            <ToastContainer/>
            <Box mt={4}>
                <Typography variant="h4">Project Form</Typography>
                <form onSubmit={handleSubmit}>
                    <div>
                        <InputLabel htmlFor="projectName">Project Name</InputLabel>
                        <TextField size="small" fullWidth id="projectName" name="projectName" onChange={(e) => setProjectName(e.target.value)} required />
                    </div>

                    <div style={{display:'flex'}}>
                        <div style={{flex:1}}>
                            <InputLabel htmlFor="projectStartDate">Project Start Date</InputLabel>
                            <TextField size="small" fullWidth id="projectStartDate" type="date" name="projectStartDate" onChange={(e) => setProjectStartDate(e.target.value)} required />
                        </div>
                        <div style={{flex:1}}>
                            <InputLabel htmlFor="projectEndDate">Project End Date</InputLabel>
                            <TextField size="small" fullWidth id="projectEndDate" type="date" name="projectEndDate" onChange={(e) => setProjectEndDate(e.target.value)} required />
                        </div>
                        <div style={{flex:1}}>
                            <InputLabel htmlFor="projectManager">Project Manager</InputLabel>
                            <TextField size="small" fullWidth id="projectManager" name="projectManager" onChange={(e) => setProjectManager(e.target.value)} required />
                        </div>
                        <div style={{flex:1}}>
                            <InputLabel htmlFor="projectStatus">Project Status</InputLabel>
                            <TextField size="small" fullWidth id="projectStatus" name="projectStatus" onChange={(e) => setProjectStatus(e.target.value)} required />
                        </div>

                    </div>
                    {resources.map((resource, index) => (
                        <div key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="h6">Resource {index + 1}</Typography>
                            <div style={{ flex: 1 }}>
                                <InputLabel htmlFor={`resourceName${index}`}>Resource Name</InputLabel>
                                <TextField
                                    size="small"
                                    fullWidth
                                    id={`resourceName${index}`}
                                    name={`resourceName${index}`}
                                    value={resource.name}
                                    onChange={(e) => handleResourceChange(index, 'name', e.target.value)}
                                    required
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <InputLabel htmlFor={`approverName${index}`}>Approver Name</InputLabel>
                                <TextField
                                    size="small"
                                    fullWidth
                                    id={`approverName${index}`}
                                    name={`approverName${index}`}
                                    value={resource.approverName}
                                    onChange={(e) => handleResourceChange(index, 'approverName', e.target.value)}
                                    required
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <InputLabel htmlFor={`allocationStartDate${index}`}>Allocation Start Date</InputLabel>
                                <TextField
                                    size="small"
                                    id={`allocationStartDate${index}`}
                                    type="date"
                                    name={`allocationStartDate${index}`}
                                    value={resource.allocationStartDate}
                                    onChange={(e) => handleResourceChange(index, 'allocationStartDate', e.target.value)}
                                    required
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <InputLabel htmlFor={`allocationEndDate${index}`}>Allocation End Date</InputLabel>
                                <TextField
                                    size="small"
                                    id={`allocationEndDate${index}`}
                                    type="date"
                                    name={`allocationEndDate${index}`}
                                    value={resource.allocationEndDate}
                                    onChange={(e) => handleResourceChange(index, 'allocationEndDate', e.target.value)}
                                    required
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <InputLabel htmlFor={`allocationStatus${index}`}>Allocation Status</InputLabel>
                                <TextField
                                    size="small"
                                    fullWidth
                                    id={`allocationStatus${index}`}
                                    name={`allocationStatus${index}`}
                                    value={resource.allocationStatus}
                                    onChange={(e) => handleResourceChange(index, 'allocationStatus', e.target.value)}
                                    required
                                />
                            </div>
                            <IconButton onClick={() => removeResource(index)}>
                                <RemoveIcon />
                            </IconButton>
                        </div>
                    ))}
                    <Box mt={2}>
                        <Button variant="contained" color="primary" type="button" onClick={addResource}>
                            Add Resource
                        </Button>
                    </Box>
                    <Box mt={2}>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}

export default ProjectsForm;
