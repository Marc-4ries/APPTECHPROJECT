import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateEvent() {
  const [form, setForm] = useState({
    organizer: '',
    title: '',
    date: '',
    venue: '',
    description: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://apptechproject.onrender.com/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data.message);
        navigate('/events');
      } else {
        console.error('Failed to save event to the database');
      }
    } catch (error) {
      console.error('Error connecting to the server:', error);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-7 col-lg-6">
        <div className="card shadow">
          <div className="card-body p-4">
            <h2 className="card-title text-success mb-4">Create Community Event</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Organizer Name</label>
                <input
                  className="form-control"
                  required
                  onChange={e => setForm({ ...form, organizer: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Event Title</label>
                <input
                  className="form-control"
                  required
                  onChange={e => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Date</label>
                <input
                  type="date"
                  className="form-control"
                  required
                  onChange={e => setForm({ ...form, date: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Venue</label>
                <input
                  className="form-control"
                  required
                  onChange={e => setForm({ ...form, venue: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  className="form-control"
                  rows={4}
                  required
                  onChange={e => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-success w-100">Submit Event</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;