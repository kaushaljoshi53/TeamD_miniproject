import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import eventsData from '../models/EventsData';
import { ToastContainer, toast } from 'react-toastify';
import { eventsDataValidations } from '../utils/dataValidation';


function EventForm() {
    const [eventName, setEventName] = useState<string>('') ;
    const [eventDate, setEventDate] = useState<string>('') ;
    const [startTime, setStartTime] = useState<string>('') ;
    const [endTime, setEndTime] = useState<string>('') ;
    const [eventOrganiser, setEventOrganiser] = useState<string>('') ;
    const [eventVenue, setEventVenue] = useState<string>('') ;

    

    

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        const eventDetails: eventsData = {
            eventName:eventName,
            eventDate:eventDate,
            startTime:startTime,
            endTime:endTime,
            eventOrganiser:eventOrganiser,
            eventVenue:eventVenue,

        }
        
        const message = await eventsDataValidations.addEvent(eventDetails);

        if (message === "Event Added Successfully") {
            toast.success(message);
        }
        else {
            toast.error(message);
        }


    };

    return (
        <Container maxWidth="xs"
            sx={{
                border: '1px solid #ccc', // Add a border
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add a shadow
                borderRadius: '8px', // Add border-radius
                paddingBottom: "2%",
                marginTop: '3%',
                color: "#19015B",
                backgroundColor: "white"
            }}>
            <ToastContainer />
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
                            
                            onChange={(e) =>setEventName(e.target.value)}
                        required
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="Date">Start Date (YYYY/MM/DD)</InputLabel>
                        <TextField
                            size='small'
                            fullWidth
                            id="Date"
                            type="text"
                            name="Date"
                            
                            onChange={(e)=>setEventDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="startTime">Start Time (HH:MM)</InputLabel>
                        <TextField
                            size='small'
                            fullWidth
                            id="startTime"
                            type="text"
                            name="startTime"
                            onChange={(e)=>setStartTime(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="endTime">End Time (HH:MM)</InputLabel>
                        <TextField
                            size='small'
                            fullWidth
                            id="endTime"
                            type="text"
                            name="endTime"
                            onChange={(e)=>setEndTime(e.target.value)}
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
                            onChange={(e)=>setEventOrganiser(e.target.value)}
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
                            onChange={(e)=>setEventVenue(e.target.value)}
                            required
                        />
                    </div>
                    <Box mt={2} >
                        <Button variant="contained" color="secondary" sx={{ backgroundColor: "#FF059C" }} type="submit" fullWidth onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}

export default EventForm;
