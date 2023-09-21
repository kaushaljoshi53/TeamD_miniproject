import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Autocomplete, AutocompleteInputChangeReason, Modal, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProjectForm from './ProjectsForm';


function Row(props: { row: any }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell sx={{ width: 10 }}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.projectName}
                </TableCell>
                <TableCell >{row.projectManager}</TableCell>
                <TableCell >{row.projectStartDate.year}/{row.projectStartDate.month}/{row.projectStartDate.day}</TableCell>
                <TableCell >{row.projectEndDate.year}/{row.projectEndDate.month}/{row.projectEndDate.day}</TableCell>
                <TableCell >{row.projectStatus}</TableCell>
                <TableCell >
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant='h6'>
                                Resources
                            </Typography>
                            <Table size="small" aria-label="projectTeam">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell >Approver</TableCell>
                                        <TableCell>Allocation Start Date</TableCell>
                                        <TableCell >Allocation End Date</TableCell>
                                        <TableCell >Allocation Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.resources.map((resourcesRow:any) => (
                                        <TableRow key={resourcesRow.name}>
                                            <TableCell component="th" scope="row">{resourcesRow.name}</TableCell>
                                            <TableCell >{resourcesRow.approver}</TableCell>
                                            <TableCell>{resourcesRow.allocationStartDate.year}/{resourcesRow.allocationStartDate.month}/{resourcesRow.allocationStartDate.day}</TableCell>
                                            <TableCell >{resourcesRow.allocationEndDate.year}/{resourcesRow.allocationEndDate.month}/{resourcesRow.allocationEndDate.day}</TableCell>
                                            <TableCell >{resourcesRow.allocationStatus}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}



export default function AdminProjectAllocation(props: { projects: any[] }) {
    const [searchText, setSearchText] = React.useState('');
    const [selectedOption, setSelectedOption] = React.useState<string>('');
    const [rows, setRows] = React.useState(props.projects);

    // Handle input change for search
    // Modify the event types to accept the correct parameters
    const handleSearchInputChange = (
        event: React.ChangeEvent<{}>, // Change the event type
        value: string,
        reason: AutocompleteInputChangeReason
    ) => {
        const text = value.toLowerCase();
        setSearchText(text);
        const filteredRows = props.projects.filter((row) =>
            row.projectName.toLowerCase().includes(text)
        );
        setRows(filteredRows);
    };

    const handleOptionSelect = (
        event: React.ChangeEvent<{}>, // Change the event type
        value: string | null
    ) => {
        if (value) {
            setSelectedOption(value);
            setSearchText(value.toLowerCase());
        } else {
            setSelectedOption('');
        }
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  

    return (
        <TableContainer component={Paper} sx={{ width: "100%", margin: 0 }}>
            <Table aria-label="collapsible table" size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={6}>
                            <Autocomplete
                                freeSolo
                                id="free-solo-2-demo"
                                disableClearable
                                options={props.projects.map((option) => option.projectName)}
                                value={selectedOption}
                                onInputChange={handleSearchInputChange} // Handle input change
                                onChange={handleOptionSelect} // Handle option select
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search input"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }}
                                        sx={{ padding: 0 }}
                                        value={searchText} // Set the input value
                                    />
                                )}
                            />
                        </TableCell>
                        <TableCell>
                            <IconButton onClick={handleOpen}>
                                <AddIcon style={{ color: "#19015B", fontSize: 30 }} />
                            </IconButton>
                        </TableCell>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <ProjectForm />
                        </Modal>
                    </TableRow>
                </TableHead>
                <TableHead sx={{ backgroundColor: "#FFE5EE" }}>
                    <TableRow sx={{ height: 2 }} >
                        <TableCell />
                        <TableCell>Project Name</TableCell>
                        <TableCell >Project Manager</TableCell>
                        <TableCell >Start Date</TableCell>
                        <TableCell >End Date</TableCell>
                        <TableCell >Project Status</TableCell>
                        <TableCell >Edit</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.projectName} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
