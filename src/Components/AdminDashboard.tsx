import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
}

interface EventItem {
  _id: string;
  organizer: string;
  title: string;
  date: string;
  venue: string;
  description: string;
}

function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [activeTab, setActiveTab] = useState<'messages' | 'events'>('messages');
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://apptechproject.onrender.com/api/messages')
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error('Error fetching messages:', err));

    fetch('https://apptechproject.onrender.com/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Error fetching events:', err));
  }, []);

  const deleteMsg = async (id: string) => {
    try {
      await fetch(`https://apptechproject.onrender.com/api/messages/${id}`, { method: 'DELETE' });
      setMessages(messages.filter(m => m._id !== id));
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  const deleteAllMsgs = async () => {
    for (const msg of messages) {
      await fetch(`https://apptechproject.onrender.com/api/messages/${msg._id}`, { method: 'DELETE' });
    }
    setMessages([]);
  };

  const deleteEvent = async (id: string) => {
    try {
      await fetch(`https://apptechproject.onrender.com/api/events/${id}`, { method: 'DELETE' });
      setEvents(events.filter(e => e._id !== id));
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };

  const saveEditedEvent = async () => {
    if (!editingEvent) return;
    try {
      const res = await fetch(`https://apptechproject.onrender.com/api/events/${editingEvent._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingEvent)
      });
      const data = await res.json();
      setEvents(events.map(e => e._id === editingEvent._id ? data.event : e));
      setEditingEvent(null);
    } catch (err) {
      console.error('Error updating event:', err);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-11">
        <div className="card shadow">
          <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="card-title text-success mb-0">Admin Control Center</h2>
              <button onClick={() => navigate('/')} className="btn btn-dark">Log Out</button>
            </div>

            {/* tabs */}
            <ul className="nav nav-tabs mb-4">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'messages' ? 'active text-success' : ''}`}
                  onClick={() => setActiveTab('messages')}
                >
                  Messages
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'events' ? 'active text-success' : ''}`}
                  onClick={() => setActiveTab('events')}
                >
                  Events
                </button>
              </li>
            </ul>

            {/* messages tab */}
            {activeTab === 'messages' && (
              <>
                <div className="table-responsive">
                  <table className="table table-striped table-bordered align-middle">
                    <thead className="table-success">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th style={{ width: '100px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="text-center py-4 text-muted">No messages yet.</td>
                        </tr>
                      ) : (
                        messages.map((m) => (
                          <tr key={m._id}>
                            <td>{m.name}</td>
                            <td>{m.email}</td>
                            <td>{m.message}</td>
                            <td>
                              <button onClick={() => deleteMsg(m._id)} className="btn btn-danger btn-sm">Delete</button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                {messages.length > 0 && (
                  <button onClick={deleteAllMsgs} className="btn btn-danger mt-2">Delete All</button>
                )}
              </>
            )}

            {/* events tab */}
            {activeTab === 'events' && (
              <>
                {/* edit form */}
                {editingEvent && (
                  <div className="card border-success mb-4 p-3">
                    <h5 className="text-success mb-3">Editing Event</h5>
                    <div className="mb-2">
                      <label className="form-label fw-semibold">Title</label>
                      <input className="form-control" value={editingEvent.title}
                        onChange={e => setEditingEvent({ ...editingEvent, title: e.target.value })} />
                    </div>
                    <div className="mb-2">
                      <label className="form-label fw-semibold">Organizer</label>
                      <input className="form-control" value={editingEvent.organizer}
                        onChange={e => setEditingEvent({ ...editingEvent, organizer: e.target.value })} />
                    </div>
                    <div className="mb-2">
                      <label className="form-label fw-semibold">Date</label>
                      <input type="date" className="form-control" value={editingEvent.date}
                        onChange={e => setEditingEvent({ ...editingEvent, date: e.target.value })} />
                    </div>
                    <div className="mb-2">
                      <label className="form-label fw-semibold">Venue</label>
                      <input className="form-control" value={editingEvent.venue}
                        onChange={e => setEditingEvent({ ...editingEvent, venue: e.target.value })} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Description</label>
                      <textarea className="form-control" rows={3} value={editingEvent.description}
                        onChange={e => setEditingEvent({ ...editingEvent, description: e.target.value })} />
                    </div>
                    <div className="d-flex gap-2">
                      <button onClick={saveEditedEvent} className="btn btn-success">Save Changes</button>
                      <button onClick={() => setEditingEvent(null)} className="btn btn-secondary">Cancel</button>
                    </div>
                  </div>
                )}

                <div className="table-responsive">
                  <table className="table table-striped table-bordered align-middle">
                    <thead className="table-success">
                      <tr>
                        <th>Title</th>
                        <th>Organizer</th>
                        <th>Date</th>
                        <th>Venue</th>
                        <th>Description</th>
                        <th style={{ width: '150px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-4 text-muted">No events yet.</td>
                        </tr>
                      ) : (
                        events.map((ev) => (
                          <tr key={ev._id}>
                            <td>{ev.title}</td>
                            <td>{ev.organizer}</td>
                            <td>{ev.date}</td>
                            <td>{ev.venue}</td>
                            <td>{ev.description}</td>
                            <td>
                              <div className="d-flex gap-1">
                                <button onClick={() => setEditingEvent(ev)} className="btn btn-warning btn-sm">Edit</button>
                                <button onClick={() => deleteEvent(ev._id)} className="btn btn-danger btn-sm">Delete</button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;