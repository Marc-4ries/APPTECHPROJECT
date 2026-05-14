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

const EventList = () => {

  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {

    fetchEvents();

  }, []);

  const fetchEvents = async () => {

    try {

      const response = await axios.get(
        'http://localhost:5000/api/events'
      );

      console.log(response.data);

      setEvents(response.data);

    } catch (error) {

      console.error(
        "Failed to fetch events",
        error
      );

    }
  };

  return (

    <div className="container mt-5">

      <h2 className="mb-4 text-primary">
        Community Events
      </h2>

      <div className="row">

        {events.length === 0 ? (

          <div className="col-12">

            <div className="alert alert-info">

              No Events Available

            </div>

          </div>

        ) : (

          events.map((event) => (

            <div
              key={event._id}
              className="col-md-4 mb-4"
            >

              <div className="card shadow h-100">

                <div className="card-body">

                  <h4 className="text-primary">
                    {event.eventName}
                  </h4>

                  <p>
                    <strong>Location:</strong>{" "}
                    {event.location}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {event.date}
                  </p>

                  <p>
                    {event.description}
                  </p>

                </div>

                <div className="card-footer">

                  <small>
                    Organized by {event.organizer}
                  </small>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );
};

export default EventList;
