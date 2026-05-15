import React, { useState, useEffect } from 'react';

interface EventItem {
  _id: string;
  organizer: string;
  title: string;
  date: string;
  venue: string;
  description: string;
}

function EventList() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    fetch('https://apptechproject.onrender.com/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Error fetching events:', err));
  }, []);

  return (
    <div className="row justify-content-center">
      <div className="col-md-9 col-lg-8">
        <div className="card shadow mb-4">
          <div className="card-body p-4">
            <h2 className="card-title text-success mb-4">Sustainable Community Events</h2>

            {events.length === 0 ? (
              <p className="text-muted text-center py-3">No events yet. Be the first to create one!</p>
            ) : (
              events.map((ev) => (
                <div key={ev._id} className="card mb-3 border-success">
                  <div className="card-body text-center">
                    <h4 className="card-title text-success">{ev.title}</h4>
                    <p className="mb-1">
                      <strong>Organizer:</strong> {ev.organizer} &nbsp;|&nbsp; <strong>Venue:</strong> {ev.venue}
                    </p>
                    <p className="mb-2"><strong>Date:</strong> {ev.date}</p>
                    <hr />
                    <p className="card-text text-muted">{ev.description}</p>
                  </div>
                </div>
              ))
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default EventList;