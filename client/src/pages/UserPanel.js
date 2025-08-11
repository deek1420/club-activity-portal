import React from "react";

function UserPanel() {
  return (
    <div className="container fade-in">
      <h2>🙋 User Panel</h2>
      <p>Welcome! Here you can explore clubs and register for events.</p>

      <div className="grid">
        <div className="card">
          <h3>View Clubs</h3>
          <p>Check out all the clubs and their activities.</p>
        </div>
        <div className="card">
          <h3>Register for Events</h3>
          <p>Find upcoming events and sign up easily.</p>
        </div>
        <div className="card">
          <h3>My Registrations</h3>
          <p>Track events you have registered for.</p>
        </div>
      </div>
    </div>
  );
}

export default UserPanel;
