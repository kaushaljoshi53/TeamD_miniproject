import * as React from 'react';
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
import EditIcon from '@mui/icons-material/Edit'; 
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Autocomplete, AutocompleteInputChangeReason, TextField } from '@mui/material';

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
        <TableCell >{row.calories}</TableCell>
        <TableCell >{row.fat}</TableCell>
        <TableCell >{row.carbs}</TableCell>
        <TableCell >{row.protein}</TableCell>
        <TableCell >{row.protein}</TableCell>
        <TableCell><EditIcon/></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6'>
                Details
              </Typography>
              <Table size='small' aria-label="projectDetails">
                <TableRow>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Project Status</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2023/04/01</TableCell>
                  <TableCell>2023/09/05</TableCell>
                  <TableCell>Amber</TableCell>
                </TableRow>
              </Table>
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
                    <TableCell >Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell >{historyRow.amount}</TableCell>
                      <TableCell >{historyRow.amount}</TableCell>
                      <TableCell >
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
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

const initialRows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function ProjectAllocation() {
  const [searchText, setSearchText] = React.useState('');
  const [selectedOption, setSelectedOption] = React.useState<string>('');
  const [rows, setRows] = React.useState(initialRows);

  // Handle input change for search
  // Modify the event types to accept the correct parameters
  const handleSearchInputChange = (
    event: React.ChangeEvent<{}>, // Change the event type
    value: string,
    reason: AutocompleteInputChangeReason
  ) => {
    const text = value.toLowerCase();
    setSearchText(text);
    const filteredRows = initialRows.filter((row) =>
      row.name.toLowerCase().includes(text)
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


  return (
    <TableContainer component={Paper} sx={{ width: "100%", margin: 0 }}>
      <Table aria-label="collapsible table" size='small'>
        <TableHead>
          <TableRow>
            <TableCell colSpan={7}>
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={initialRows.map((option) => option.name)}
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
          </TableRow>
        </TableHead>
        <TableHead sx={{ backgroundColor: "#FFE5EE" }}>
          <TableRow sx={{ height: 2 }} >
            <TableCell />
            <TableCell>Project Name</TableCell>
            <TableCell >Project Manager</TableCell>
            <TableCell >Approver</TableCell>
            <TableCell >Allocation Start Date</TableCell>
            <TableCell >Allocation End Date</TableCell>
            <TableCell >Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
