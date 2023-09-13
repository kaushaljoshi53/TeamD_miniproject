// import React, { useState, useEffect } from "react";
// import "../styles/Event.css";
// import axios from "axios";


// interface Event {
//     event_name: string;
//     event_start_date: string;
//     event_end_date:string;
//     event_start_time:string;
//     event_end_time:string;
//     event_organizer: string;
//     event_venue: string;
//   }

// // ... (other code)

// const EventList: React.FC = () => {

//     const [events, setEvents] = useState<Event[]>([]);
//     const [currentPage, setCurrentPage] = useState<number>(1);


//     const [isLastPage, setIsLastPage] = useState<boolean>(false);

//     useEffect(() => {
//       axios.get(`http://localhost:8081/events?page=${currentPage}`)
//         .then((response) => {
//           const data = response.data;
//           if (data.length === 0) {
//             // If no data is returned, reset to the first page (cyclic behavior)
//             setIsLastPage(true);
//             // alert("No more details available");
//           } else {
//             setIsLastPage(false);
//             setEvents(data);
//           }
//         })
//         .catch((error) => console.error("Error fetching data:", error));
//     }, [currentPage]);

//   // ... (previous code)

//   // State for managing the new event form
//   const [showAddEventForm, setShowAddEventForm] = useState<boolean>(false);

//   // State for storing the new event data
//   const [newEvent, setNewEvent] = useState<Event>({
//     event_name: "",
//     event_start_date: "",
//     event_end_date: "",
//     event_start_time: "",
//     event_end_time: "",
//     event_organizer: "",
//     event_venue: "",
//   });

//   // Function to handle form submission
//   const handleAddEvent = () => {
//     // Send a POST request to your server to add the new event
//     axios
//       .post("http://localhost:8081/events", newEvent)
//       .then((response) => {
//         // Handle the response as needed
//         console.log("Event added successfully:", response.data);

//         // Reset the form and hide it
//         setNewEvent({
//           event_name: "",
//           event_start_date: "",
//           event_end_date: "",
//           event_start_time: "",
//           event_end_time: "",
//           event_organizer: "",
//           event_venue: "",
//         });
//         setShowAddEventForm(false);
//       })
//       .catch((error) => console.error("Error adding event:", error));
//   };

//   return (
//     <div className="container">
//       <div className="headers">
//         <h1>Upcoming Events</h1>
//         <button onClick={() => setShowAddEventForm(!showAddEventForm)}>
//           {showAddEventForm ? "Cancel" : "Add Event"}
//         </button>
//       </div>
//       {showAddEventForm && (
//         <div className="event_form">
//           {/* Add input fields for event details */}
//           <input
//             type="text"
//             placeholder="Event Name"
//             value={newEvent.event_name}
//             onChange={(e) =>
//               setNewEvent({ ...newEvent, event_name: e.target.value })
//             }
//           />
//                     <input
//             type="text"
//             placeholder="Start Date"
//             value={newEvent.event_start_date}
//             onChange={(e) =>
//               setNewEvent({ ...newEvent, event_start_date: e.target.value })
//             }
//           />
//                     <input
//             type="text"
//             placeholder="End Date"
//             value={newEvent.event_end_date}
//             onChange={(e) =>
//               setNewEvent({ ...newEvent, event_end_date: e.target.value })
//             }
//           />
//                     <input
//             type="text"
//             placeholder="Start Time"
//             value={newEvent.event_start_time}
//             onChange={(e) =>
//               setNewEvent({ ...newEvent, event_start_time: e.target.value })
//             }
//           />
//                     <input
//             type="text"
//             placeholder="End Time"
//             value={newEvent.event_end_time}
//             onChange={(e) =>
//               setNewEvent({ ...newEvent, event_end_time: e.target.value })
//             }
//           />
//                     <input
//             type="text"
//             placeholder="Event Organizer"
//             value={newEvent.event_organizer}
//             onChange={(e) =>
//               setNewEvent({ ...newEvent, event_organizer: e.target.value })
//             }
//           />
//                     <input
//             type="text"
//             placeholder="Event Venue"
//             value={newEvent.event_venue}
//             onChange={(e) =>
//               setNewEvent({ ...newEvent, event_venue: e.target.value })
//             }
//           />
//           {/* Add other input fields for event details here */}
//           <button onClick={handleAddEvent}>Add</button>
//         </div>
//       )}
//       {events.length > 0 && (
//         <div className="event_details">
//           {/* Display the list of events */}
//           {/* ... (previous code to display events) */}
//         </div>
//       )}
//       <button
//         onClick={() => setCurrentPage(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         Previous
//       </button>
//       <button onClick={() => setCurrentPage(currentPage + 1)} disabled={isLastPage}>
//         Next
//       </button>
//     </div>
//   );
// };

// export default EventList;





import React, { useState, useEffect } from "react";
import "../styles/AddEvent.css";
import axios from "axios";

interface Event {
    event_name: string;
    event_start_date: string;
    event_end_date: string;
    event_start_time: string;
    event_end_time: string;
    event_organizer: string;
    event_venue: string;
}

const EventList: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLastPage, setIsLastPage] = useState<boolean>(false);

    // State for managing the new event form visibility
    const [isAddEventModalOpen, setIsAddEventModalOpen] = useState<boolean>(false);

    // State for storing the new event data
    const [newEvent, setNewEvent] = useState<Event>({
        event_name: "",
        event_start_date: "",
        event_end_date: "",
        event_start_time: "",
        event_end_time: "",
        event_organizer: "",
        event_venue: "",
    });

    useEffect(() => {
        axios
            .get(`http://localhost:8081/events?page=${currentPage}`)
            .then((response) => {
                const data = response.data;
                if (data.length === 0) {
                    setIsLastPage(true);
                } else {
                    setIsLastPage(false);
                    setEvents(data);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [currentPage]);


  

    const handleAddEvent = () => {
        axios
            .post("http://localhost:8081/eventsadd", newEvent)
            .then((response) => {
                console.log("Event added successfully:", response.data);
                setNewEvent({
                    event_name: "",
                    event_start_date: "",
                    event_end_date: "",
                    event_start_time: "",
                    event_end_time: "",
                    event_organizer: "",
                    event_venue: "",
                });
                setIsAddEventModalOpen(false);
            })
            .catch((error) => console.error("Error adding event:", error));
    };

    return (
        <div className="container">
            <div className="headers">
                <h1>Upcoming Events</h1>
                <span className="addingevents" onClick={() => setIsAddEventModalOpen(true)}>+</span>
            </div>
            {isAddEventModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsAddEventModalOpen(false)}>
                            &times;
                        </span>
                        <h2>Add Event</h2>
                        <div className="event_form">
                            <div className="form-group">
                                <label htmlFor="event_name">Event Name:</label>
                                <input
                                    type="text"
                                    id="event_name"
                                    name="event_name"
                                    value={newEvent.event_name}
                                    onChange={(e) =>
                                        setNewEvent({ ...newEvent, event_name: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="event_start_date">Start Date:</label>
                                <input
                                    type="date"
                                    id="event_start_date"
                                    name="event_start_date"
                                    value={newEvent.event_start_date}
                                    onChange={(e) =>
                                        setNewEvent({ ...newEvent, event_start_date: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="event_end_date">End Date:</label>
                                <input
                                    type="date"
                                    id="event_end_date"
                                    name="event_end_date"
                                    value={newEvent.event_end_date}
                                    onChange={(e) =>
                                        setNewEvent({ ...newEvent, event_end_date: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="event_start_time">Start Time:</label>
                                <input
                                    type="time"
                                    id="event_start_time"
                                    name="event_start_time"
                                    value={newEvent.event_start_time}
                                    onChange={(e) =>
                                        setNewEvent({ ...newEvent, event_start_time: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="event_end_time">End Time:</label>
                                <input
                                    type="time"
                                    id="event_end_time"
                                    name="event_end_time"
                                    value={newEvent.event_end_time}
                                    onChange={(e) =>
                                        setNewEvent({ ...newEvent, event_end_time: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="event_organizer">Event Organizer:</label>
                                <input
                                    type="text"
                                    id="event_organizer"
                                    name="event_organizer"
                                    value={newEvent.event_organizer}
                                    onChange={(e) =>
                                        setNewEvent({ ...newEvent, event_organizer: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="event_venue">Event Venue:</label>
                                <input
                                    type="text"
                                    id="event_venue"
                                    name="event_venue"
                                    value={newEvent.event_venue}
                                    onChange={(e) =>
                                        setNewEvent({ ...newEvent, event_venue: e.target.value })
                                    }
                                />
                            </div>
                            <button  onClick={() => handleAddEvent()}>Add</button>
                        </div>
                    </div>
                </div>
            )}
            {events.length > 0 && (
                <div className="event_details">
                    <strong>Event Name:</strong> {events[0].event_name}
                    <br />
                    <strong>Start Date:</strong> {events[0].event_start_date}
                    <br />
                    <strong>End Date:</strong> {events[0].event_end_date}
                    <br />
                    <strong>Start Time:</strong> {events[0].event_start_time}
                    <br />
                    <strong>End Time:</strong> {events[0].event_end_time}
                    <br />
                    <strong>Event Organizer:</strong> {events[0].event_organizer}
                    <br />
                    <strong>Event Venue:</strong> {events[0].event_venue}
                </div>
            )}
            <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={isLastPage}>
                Next
            </button>
        </div>
    );
};

export default EventList;
