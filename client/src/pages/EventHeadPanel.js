import React from "react";

function EventHeadPanel() {
  return (
    <div className="container fade-in">
      <h2>🎯 Event Head Panel</h2>
      <p>Welcome, Event Head! Here you can create and manage events for your club.</p>

      <div className="grid">
        <div className="card">
          <h3>Create Events</h3>
          <p>Schedule new events with date, venue, and description.</p>
        </div>
        <div className="card">
          <h3>Manage Events</h3>
          <p>Update event details or cancel events if needed.</p>
        </div>
        <div className="card">
          <h3>View Event Registrations</h3>
          <p>See the list of participants for your events.</p>
        </div>
      </div>
    </div>
  );
}

export default EventHeadPanel;
