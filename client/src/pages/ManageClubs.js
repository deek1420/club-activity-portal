import React, { useState, useEffect } from "react";
import "../styles/ManageClubs.css";

function ManageClubs() {
  const [clubs, setClubs] = useState([
    { name: "Coding Club", description: "For programmers and developers", contact: "coding@college.edu" },
    { name: "Photography Club", description: "Capture and create memories", contact: "photo@college.edu" },
    { name: "Drama Club", description: "Stage performances and acting", contact: "drama@college.edu" }
  ]);
  
  const [newClub, setNewClub] = useState({ name: "", description: "", contact: "" });

  const handleAddClub = () => {
    if (!newClub.name || !newClub.description || !newClub.contact) {
      alert("Please fill all fields.");
      return;
    }
    setClubs([...clubs, newClub]);
    setNewClub({ name: "", description: "", contact: "" });
  };

  const handleDeleteClub = (index) => {
    if (window.confirm("Are you sure you want to delete this club?")) {
      const updatedClubs = clubs.filter((_, i) => i !== index);
      setClubs(updatedClubs);
    }
  };

  return (
    <div className="manage-clubs">
      <h2>Manage Clubs</h2>

      {/* Add Club Form */}
      <div className="table-container" style={{ padding: "20px", marginBottom: "25px" }}>
        <div className="club-form">
          <input
            type="text"
            placeholder="Club Name"
            value={newClub.name}
            onChange={(e) => setNewClub({ ...newClub, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newClub.description}
            onChange={(e) => setNewClub({ ...newClub, description: e.target.value })}
          />
          <input
            type="email"
            placeholder="Contact Email"
            value={newClub.contact}
            onChange={(e) => setNewClub({ ...newClub, contact: e.target.value })}
          />
          <button onClick={handleAddClub}>Add Club</button>
        </div>
      </div>

      {/* Clubs Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club, index) => (
              <tr key={index}>
                <td>{club.name}</td>
                <td>{club.description}</td>
                <td>{club.contact}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClub(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageClubs;
