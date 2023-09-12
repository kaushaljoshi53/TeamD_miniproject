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
    const [eventendtime, setEventendtime] = useState("");
    const [eventorganize, setEventorganize] = useState("");
    const [eventVenue, setEventVenue] = useState("");


    const [projectName, setProjectName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [teamLeader, setTeamLeader] = useState("");
    const [teamMembers, setTeamMembers] = useState<string[]>([]);
    const [newTeamMember, setNewTeamMember] = useState<string>('');
    const [status, setStatus] = useState("");






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
            setTeamLeader("");
            setTeamMembers([]);
            setStatus("");

        }
    }, [isFormVisible]);
    const currentDate = new Date().toISOString().split('T')[0];
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
                                <option className="values" value="">Select an option</option>
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
                                <button className="butonclr" type="button"   onClick={addTeamMember}>+</button>
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
                                <option className="values" value="On Meeting">Inprogress</option>
                                <option className="values" value="Tidel Conference Hall">Completed</option>

                            </select>
                        </div>

                        <button className="add-event-button" type="submit" onClick={handleSubmit} >
                            Submit
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AddEvent;




