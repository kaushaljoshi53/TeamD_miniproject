import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';

function EventForm() {
    const [eventDetails, setEventDetails] = useState({
        eventName: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        organizerName: '',
        venue: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setEventDetails({
            ...eventDetails,
            [name]: value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // You can handle form submission logic here
        
        console.log('Event Details:', eventDetails);
    };

    return (
        <Container maxWidth="xs"
            sx={{
                border: '1px solid #ccc', // Add a border
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add a shadow
                borderRadius: '8px', // Add border-radius
                paddingBottom:"2%",
                marginTop: '3%',
                color:"#19015B"
            }}>
            <Box mt={4}>
                <Typography variant='h4' >Event Form</Typography>
                <form onSubmit={handleSubmit}>
                    <div>
                        <InputLabel htmlFor="eventName">Event Name</InputLabel>
                        <TextField
                            size='small'
                            fullWidth
                            id="eventName"
                            name="eventName"
                            value={eventDetails.eventName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="startDate">Start Date</InputLabel>
                        <TextField
                            size='small'
                            fullWidth
                            id="startDate"
                            type="date"
                            name="startDate"
                            value={eventDetails.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="startTime">Start Time</InputLabel>
                        <TextField
                            size='small'
                            fullWidth
                            id="startTime"
                            type="time"
                            name="startTime"
                            value={eventDetails.startTime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="endDate">End Date</InputLabel>
                        <TextField
                            size='small'
                            fullWidth
                            id="endDate"
                            type="date"
                            name="endDate"
                            value={eventDetails.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="endTime">End Time</InputLabel>
                        <TextField
                            size='small'
                            fullWidth
                            id="endTime"
                            type="time"
                            name="endTime"
                            value={eventDetails.endTime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="organizerName">Organizer Name</InputLabel>
                        <TextField
                            size='small'
                            fullWidth
                            id="organizerName"
                            name="organizerName"
                            value={eventDetails.organizerName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="venue">Event Venue</InputLabel>
                        <TextField
                            size='small'
                            fullWidth
                            id="venue"
                            name="venue"
                            value={eventDetails.venue}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Box mt={2} >
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}

export default EventForm;
