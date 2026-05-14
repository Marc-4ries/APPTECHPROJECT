import React from 'react';

export interface Message {
  name: string;
  email: string;
  message: string;
}

export interface EventItem {
  organizer: string;
  title: string;
  date: string;
  venue: string;
  description: string;
}

interface AdminProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

function AdminDashboard({ messages, setMessages }: AdminProps) {
  const deleteMsg = (index: number) => {
    const updated = messages.filter((_, i) => i !== index);
    setMessages(updated);
  };

  return (
    <div className="glass-card" style={{ maxWidth: '950px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Admin Control Center</h2>
        <button onClick={() => window.location.href='/'} className="btn-primary" style={{ background: '#333' }}>
          Log Out
        </button>
      </div>
      
      <table style={{ width: '100%', background: 'white', color: '#333', borderRadius: '10px', marginTop: '1rem', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#eee', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.length === 0 ? (
            <tr><td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>No messages yet.</td></tr>
          ) : (
            messages.map((m, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{m.name}</td>
                <td>{m.email}</td>
                <td>{m.message}</td>
                <td>
                  <button onClick={() => deleteMsg(i)} style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      {messages.length > 0 && (
        <button onClick={() => setMessages([])} className="btn-primary" style={{ marginTop: '1rem', background: 'red' }}>
          Delete All
        </button>
      )}
    </div>
  );
}

export default AdminDashboard;
