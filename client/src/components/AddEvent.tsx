import React, { useState, useEffect } from "react";
import '../styles/Admin.css'

const AddEvent: React.FC = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isProjectVisible, setIsProjectVisible] = useState(false);
    

    // Define state for form fields here
    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventendDate, setEventendDate] = useState("");
    const [eventtime, setEventtime] = useState("");
    const [eventendtime,setEventendtime]=useState("");
    const [eventorganize, setEventorganize] = useState("");
    const [eventVenue, setEventVenue] = useState("");


    const [projectName, setProjectName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [teamMembers, setTeamMembers] = useState("");
    const [projectDescription, setProjectDescription] = useState("");

    const [eventsList, setEventsList] = useState<any[]>([]); 
    

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    const handleCloseForm = () => {
        setIsFormVisible(false);
    };

    const handleCloseForms = () => {
        setIsProjectVisible(false);
    };

    const toggleProjectVisibility = () => {
        setIsProjectVisible(!isProjectVisible);
    };

    // useEffect to reset form fields when the form visibility changes
    useEffect(() => {
        if (!isFormVisible) {
            // Reset form fields
            setEventName("");
            setEventDate("");
            setEventendDate("");
            setEventtime("");
            setEventendtime("");
            setEventorganize("");
            setEventVenue("");
        }
    }, [isFormVisible]);

    useEffect(() => {
        if (!isProjectVisible) {
            // Reset form fields
            setProjectName("");
            setStartDate("");
            setEndDate("");
            setTeamMembers("");
            setProjectDescription("");
        }
    }, [isFormVisible]);
    const currentDate = new Date().toISOString().split('T')[0];
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Collect the event data from state
        const eventData = {
            eventName,
            eventDate,
            eventendDate,
            eventtime,
            eventendtime,
            eventorganize,
            eventVenue,
        };

        // Add the event data to the eventsList array
        setEventsList([...eventsList, eventData]);

        // Clear the form fields after submission
        setEventName("");
        setEventDate("");
        setEventendDate("");
        setEventtime("");
        setEventendtime("");
        setEventorganize("");
        setEventVenue("");
    };


    // Similarly, you can add another useEffect for the project form

    return (
        <div className="RightSide">
            <button onClick={toggleFormVisibility} className="add-event-button">Add Event</button>
            <button onClick={toggleProjectVisibility} className="add-event-button1">Allocate Project</button>


            {isFormVisible && (
                <div className="form-container">
                    <div className="close-button" onClick={handleCloseForm}>
                        <span className="close-mark">&times;</span>
                    </div>
                    <form>
                    
                        <div className="form-group">
                            <label htmlFor="eventName">Event Name:</label>
                            <input
                                type="text"
                                id="eventName"
                                name="eventName"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="eventDate">Event Date:</label>
                            <input
                                type="date"
                                id="eventDate"
                                name="eventDate"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                min={currentDate}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="eventendDate">Event End Date:</label>
                            <input
                                type="date"
                                id="eventendDate"
                                name="eventendDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                min={currentDate}
                               
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="eventTime">Event Time:</label>
                            <input
                                type="time"
                                id="eventTime"
                                name="eventTime"
                                value={eventtime}
                                onChange={(e) => setEventtime(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="eventTime">Event End Time:</label>
                            <input
                                type="time"
                                id="eventendTime"
                                name="eventendTime"
                                value={eventendtime}
                                onChange={(e) => setEventendtime(e.target.value)}
                            />
                        </div>
                         
                        <div className="form-group">
                            <label htmlFor="eventType">Event Type (Optional):</label>
                            <select
                                id="eventType"
                                name="eventType"
                                value={eventorganize}
                                onChange={(e) => setEventorganize(e.target.value)}
                            >
                                <option className="values"  value="">Select an option</option>
                                <option className="values" value="On Meeting">On Meeting</option>
                                <option className="values" value="Tidel Conference Hall">Tidel Conference Hall</option>
                              
                            </select>
                        </div>

                    


                        <div className="form-group">
                            <label htmlFor="eventVenue">Event Venue:</label>
                            <input
                                type="text"
                                id="eventVenue"
                                name="eventVenue"
                                value={eventVenue}
                                onChange={(e) => setEventVenue(e.target.value)}
                            />
                        </div>

                      
                        <button className="add-event-button" type="submit" onClick={handleSubmit} >
                            Submit
                        </button>
                    </form>
                </div>
                
            )}
             <div className="events-list">
                <h2>List of Events:</h2>
                <div className="column-list">
  <ul>
    {eventsList.map((event, index) => (
      <li key={index} className="event-item">
        <div className="event-info">
          <strong>Event Name:</strong> {event.eventName}
        </div>
        <div className="event-info">
          <strong>Event Date:</strong> {event.eventDate}
        </div>
        <div className="event-info">
          <strong>Event End Date:</strong> {event.eventendDate}
        </div>
        <div className="event-info">
          <strong>Event Time:</strong> {event.eventtime}
        </div>
        <div className="event-info">
          <strong>Event End Time:</strong> {event.eventendtime}
        </div>
        <div className="event-info">
          <strong>Event Type:</strong> {event.eventorganize}
        </div>
        <div className="event-info">
          <strong>Event Venue:</strong> {event.eventVenue}
        </div>
      </li>
    ))}
  </ul>
</div>


            </div>

            {isProjectVisible && (
                <div className="form-container">
                    <div className="close-button" onClick={handleCloseForms}>
                        <span className="close-mark">&times;</span>
                    </div>
                    <form>
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
                            <label htmlFor="teamMembers">Team Leader:</label>
                            <input
                                type="text"
                                id="teamMembers"
                                name="teamMembers"
                                value={teamMembers}
                                onChange={(e) => setTeamMembers(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="projectDescription">Description:</label>
                            <textarea
                                id="projectDescription"
                                name="projectDescription"
                                value={projectDescription}
                                onChange={(e) => setProjectDescription(e.target.value)}
                            />
                        </div>

                        <button className="add-event-button" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AddEvent;




