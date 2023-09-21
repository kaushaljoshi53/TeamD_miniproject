import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
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

function createData(
  event: string,
  date: string,
  startTime: string,
  endTime: string,
) {
  return {
    event,
    date,
    startTime,
    endTime,
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
          {row.event}
        </TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>{row.startTime}</TableCell>
        <TableCell>{row.endTime}</TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
  createData('Event 1', '2023-09-21', '10:00 AM', '12:00 PM'),
  createData('Event 2', '2023-09-22', '2:00 PM', '4:00 PM'),
  createData('Event 3', '2023-09-23', '11:00 AM', '1:00 PM'),
  createData('Event 4', '2023-09-24', '3:30 PM', '5:30 PM'),
  createData('Event 5', '2023-09-25', '9:00 AM', '11:30 AM'),
];

export default function EventCard() {
  const [filteredRows, setFilteredRows] = useState(initialRows);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);

  const handleSearchInputChange = (event: React.SyntheticEvent, value: string) => {
    const searchText = value.toLowerCase();
    setSelectedOption(undefined); // Clear the selected option

    // Filter the rows based on the search text
    const filtered = initialRows.filter((row) =>
      row.event.toLowerCase().includes(searchText)
    );

    setFilteredRows(filtered);
  };

  const handleOptionSelect = (event: React.SyntheticEvent, value: string | undefined) => {
    if (value !== undefined) {
      setSelectedOption(value);

      // Filter the rows based on the selected option
      const filtered = initialRows.filter((row) => row.event.toLowerCase() === value.toLowerCase());

      setFilteredRows(filtered);
    }
  };

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
                options={initialRows.map((option) => option.event)}
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
          </TableRow>
        </TableHead>
        <TableHead sx={{ backgroundColor: '#FFE5EE' }}>
          <TableRow sx={{ height: 2 }}>
            <TableCell />
            <TableCell>Event</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
            <Row key={row.event} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
