import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home';
import CreateEvent from './Components/CreateEvent';
import EventList from './Components/EventList';
import Contact from './Components/Contact';
import HiddenWeb from './Components/HiddenWeb';
import AdminDashboard from './Components/AdminDashboard';
import './App.css';

// Types
interface EventItem { 
  organizer: string; 
  title: string; 
  date: string; 
  venue: string; 
  description: string; 
}

interface Message { 
  name: string; 
  email: string; 
  message: string; 
}

export default function App() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // Handlers for state updates
  const addEvent = (newEvent: EventItem) => {
    setEvents((prev) => [...prev, newEvent]);
  };

  const addMsg = (newMsg: Message) => {
    setMessages((prev) => [...prev, newMsg]);
  };

  return (
    <Router>
      <div className="layout">
        <nav className="navbar">
          <div className="logo">🏙️ SDG 11: Sustainable Communities</div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/create">Create Event</Link>
            <Link to="/events">Event List</Link>
            <Link to="/contact">Contact Me</Link>
          </div>
        </nav>

        <main className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateEvent addEvent={addEvent} />} />
            <Route path="/events" element={<EventList events={events} />} />
          <Route path="/contact" element={<Contact addMsg={addMsg} />} />
            <Route path="/admin" element={<AdminDashboard messages={messages} setMessages={setMessages} />} />
            <Route path="/hidden" element={<HiddenWeb />} />
          </Routes>
        </main>

        <footer>© 2026 Sustainable City Initiatives | All Rights Reserved</footer>
      </div>
    </Router>
  );
}
