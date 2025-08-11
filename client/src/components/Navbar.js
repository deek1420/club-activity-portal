import React from "react";
import { FaHome, FaUsers, FaCalendarAlt, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";

function Navbar({ role, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-logo">🎓 Club Activity Portal</div>
      <ul className="nav-links">
        <li><a href="/"><FaHome /> Home</a></li>
        <li><a href="/clubs"><FaUsers /> Clubs</a></li>
        <li><a href="/events"><FaCalendarAlt /> Events</a></li>

        {role ? (
          <li><button className="logout-btn" onClick={onLogout}><FaSignOutAlt /> Logout</button></li>
        ) : (
          <li><a href="/login"><FaSignInAlt /> Login</a></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
