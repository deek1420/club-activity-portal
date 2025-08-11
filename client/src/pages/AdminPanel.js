import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminPanel.css";

function AdminPanel() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-cards">
        <div className="card" onClick={() => navigate("/manage-clubs")}>
          <span className="icon">📌</span>
          <h3>Manage Clubs</h3>
          <p>Add, edit, and delete club details.</p>
        </div>

        <div className="card" onClick={() => navigate("/manage-events")}>
          <span className="icon">📅</span>
          <h3>Manage Events</h3>
          <p>Create and update event information.</p>
        </div>

        <div className="card" onClick={() => navigate("/view-registrations")}>
          <span className="icon">📝</span>
          <h3>View Registrations</h3>
          <p>Check participant registrations.</p>
        </div>

        <div className="card" onClick={() => navigate("/manage-announcements")}>
          <span className="icon">📢</span>
          <h3>Manage Announcements</h3>
          <p>Post important updates.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
