import React from "react";
import AdminPanel from "./AdminPanel";
import EventHeadPanel from "./EventHeadPanel";
import UserPanel from "./UserPanel";
import "../App.css";

function Dashboard({ role }) {
  if (!role) {
    return (
      <div className="dashboard">
        <h2>Welcome to Club Activity Portal</h2>
        <p>Please log in to access your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h2>Welcome, {role.charAt(0).toUpperCase() + role.slice(1)}!</h2>

      {role === "admin" && <AdminPanel />}
      {role === "eventhead" && <EventHeadPanel />}
      {role === "user" && <UserPanel />}
    </div>
  );
}

export default Dashboard;
