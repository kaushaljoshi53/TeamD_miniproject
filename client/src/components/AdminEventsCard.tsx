import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
import { Autocomplete, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EventForm from './EventsForm';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  price: number,
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}


function Row(props: { row: ReturnType<typeof createData> }) {
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
          {row.name}
        </TableCell>
        <TableCell>{row.calories}</TableCell>
        <TableCell>{row.fat}</TableCell>
        <TableCell>{row.carbs}</TableCell>
        <TableCell>{row.protein}</TableCell>
        <TableCell >
          <IconButton>
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell >
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="subtitle2" gutterBottom component="div" sx={{ marginLeft: '8%' }}>
                Event Organiser: Abc&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Event Venue: Abc
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const initialRows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function EventCard() {
  const [filteredRows, setFilteredRows] = useState(initialRows);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);

  const handleSearchInputChange = (event: React.SyntheticEvent, value: string) => {
    const searchText = value.toLowerCase();
    setSelectedOption(undefined); // Clear the selected option

    // Filter the rows based on the search text
    const filtered = initialRows.filter((row) =>
      row.name.toLowerCase().includes(searchText)
    );

    setFilteredRows(filtered);
  };

  const handleOptionSelect = (event: React.SyntheticEvent, value: string | undefined) => {
    if (value !== undefined) {
      setSelectedOption(value);

      // Filter the rows based on the selected option
      const filtered = initialRows.filter((row) => row.name.toLowerCase() === value.toLowerCase());

      setFilteredRows(filtered);
    }
  };

  const addEvent = ()=>{
    
  }

  return (
    <TableContainer component={Paper} sx={{ width: '100%', margin: 0 }}>
      <Table aria-label="collapsible table" size="small">
        <TableHead>
          <TableRow>
            <TableCell colSpan={7}>
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={initialRows.map((option) => option.name)}
                value={selectedOption}
                onInputChange={(event, value) => handleSearchInputChange(event, value)} // Handle input change
                onChange={(event, value) => handleOptionSelect(event, value)} // Handle option select
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search input"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                    sx={{ padding: 0 }}
                  />
                )}
              />
            </TableCell>
            <TableCell>
              <IconButton onClick={addEvent}>
                <AddIcon style={{ color: "#19015B", fontSize: 30 }} />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableHead sx={{ backgroundColor: '#FFE5EE' }}>
          <TableRow sx={{ height: 2 }}>
            <TableCell />
            <TableCell>Event</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
