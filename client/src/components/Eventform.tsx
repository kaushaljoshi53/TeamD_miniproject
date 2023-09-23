import React, { useState } from 'react';
import '../styles/Eventform.css';

const Form: React.FC = () => {
  const [eventType, setEventType] = useState<string | null>(null);

  const handleEventTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEventType(event.target.value);
  };

  const handleCloseForm = () => {
    setEventType(null);
  };

  return (
    <div className="form-container">
      <h2>Create Event</h2>
      <label htmlFor="eventType">Select event type:</label>
      <select id="eventType" onChange={handleEventTypeChange}>
        <option value="">Select an event type</option>
        <option value="meeting">Meeting</option>
        <option value="holiday">Holiday</option>
      </select>

      {eventType === 'meeting' && (
        <>
          <label htmlFor="meetingName">Meeting Name:</label>
          <input type="text" id="meetingName" />
          <br />

          <label htmlFor="startDate">Start Date:</label>
          <input type="date" id="startDate" />
          <label htmlFor="endDate">End Date:</label>
          <input type="date" id="endDate" />
          <br />

          <label htmlFor="startTime">Start Time:</label>
          <input type="time" id="startTime" />
          <label htmlFor="endTime">End Time:</label>
          <input type="time" id="endTime" />
          <br />

          <label htmlFor="venue">Venue:</label>
          <input type="text" id="venue" />
          <br />

          <label htmlFor="description">Description:</label>
          <textarea id="description" />
        </>
      )}

      {eventType === 'holiday' && (
        <>
          <label htmlFor="holidayName">Holiday Name:</label>
          <input type="text" id="holidayName" />
          <br />

          <label htmlFor="holidayDate">Holiday Date:</label>
          <input type="date" id="holidayDate" />
          <br />

          <label htmlFor="holidayDetails">Holiday Details:</label>
          <textarea id="holidayDetails" />
        </>
      )}

      <button className="submit-button">Submit</button>
      <button className="close-button" onClick={handleCloseForm}>
        &#x2715;
      </button>
    </div>
  );
};

export default Form;
