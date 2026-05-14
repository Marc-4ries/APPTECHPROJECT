import { useEffect, useState } from 'react';
import axios from 'axios';

interface EventData {
  _id: string;
  eventName: string;
  location: string;
  date: string;
  organizer: string;
  description: string;
}

const AdminDashboard = () => {

  const [events, setEvents] = useState<EventData[]>([]);
  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    const response = await axios.get(
      'http://localhost:5000/api/events'
    );
    setEvents(response.data);
  };
  const deleteEvent = async (
    id: string
  ) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/events/${id}`
      );
      setEvents(
        events.filter(
          (event) => event._id !== id
        )
      );
      alert("Event Deleted");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container mt-5">
      <h2 className="text-danger mb-4">
        Admin Dashboard
      </h2>
      <div className="card shadow p-4">
        <table className="table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Organizer</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td>
                  {event.eventName}
                </td>
                <td>
                  {event.organizer}
                </td>
                <td>
                  {event.date}
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      deleteEvent(event._id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminDashboard;
