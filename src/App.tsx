import 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import CreateEvent from './Components/CreateEvent';
import EventList from './Components/EventList';
import Contact from './Components/Contact';
import HiddenWeb from './Components/HiddenWeb';
import AdminDashboard from './Components/AdminDashboard';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">

        <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
          <div className="container">
            <span className="navbar-brand fw-bold">🏙 SDG 11: Sustainable Communities</span>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navMenu"
              aria-controls="navMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navMenu">
              <div className="navbar-nav ms-auto">
                <NavLink className="nav-link text-white" to="/">Home</NavLink>
                <NavLink className="nav-link text-white" to="/create">Create Event</NavLink>
                <NavLink className="nav-link text-white" to="/events">Event List</NavLink>
                <NavLink className="nav-link text-white" to="/contact">Contact Me</NavLink>
              </div>
            </div>
          </div>
        </nav>

        <main className="container my-5 flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/hidden" element={<HiddenWeb />} />
            <Route path="*" element={<Navigate to="/" replace/>}/>
          </Routes>
        </main>

        <footer className="bg-dark text-white text-center py-3 mt-auto">
          © 2026 Sustainable City Initiatives | All Rights Reserved
        </footer>

      </div>
    </Router>
  );
}
