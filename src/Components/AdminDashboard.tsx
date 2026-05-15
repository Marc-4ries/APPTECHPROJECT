import React, { useState, useEffect } from 'react';

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
}

function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch('https://apptechproject.onrender.com/api/messages')
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error('Error fetching messages:', err));
  }, []);

  const deleteMsg = async (id: string) => {
    try {
      await fetch(`https://apptechproject.onrender.com/api/messages/${id}`, { method: 'DELETE' });
      setMessages(messages.filter(m => m._id !== id));
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  const deleteAll = async () => {
    for (const msg of messages) {
      await fetch(`https://apptechproject.onrender.com/api/messages/${msg._id}`, { method: 'DELETE' });
    }
    setMessages([]);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-11">
        <div className="card shadow">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="card-title text-success mb-0">Admin Control Center</h2>
              <button onClick={() => window.location.href = '/'} className="btn btn-dark">
                Log Out
              </button>
            </div>

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
                          <button onClick={() => deleteMsg(m._id)} className="btn btn-danger btn-sm">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {messages.length > 0 && (
              <button onClick={deleteAll} className="btn btn-danger mt-2">
                Delete All
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;