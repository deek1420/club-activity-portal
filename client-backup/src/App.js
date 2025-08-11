import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaCalendarAlt, FaMapMarkerAlt, FaBuilding, FaEnvelope, FaSignInAlt } from "react-icons/fa";
import "./App.css";

function App() {
  const [backendMessage, setBackendMessage] = useState("");
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newClub, setNewClub] = useState({ name: "", description: "", contact: "" });
  const [newEvent, setNewEvent] = useState({ clubId: "", title: "", date: "", venue: "" });

  const testUserId = "u101";
  const testUserName = "Ravin";

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const msgRes = await fetch("http://localhost:5000/api/message");
      const msgData = await msgRes.json();
      setBackendMessage(msgData.message);

      const clubsRes = await fetch("http://localhost:5000/api/clubs");
      const clubsData = await clubsRes.json();
      setClubs(clubsData);

      const eventsRes = await fetch("http://localhost:5000/api/events");
      const eventsData = await eventsRes.json();
      setEvents(eventsData);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setLoading(false);
    }
  }

  async function addClub() {
    const res = await fetch("http://localhost:5000/api/clubs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newClub),
    });
    if (res.ok) {
      setNewClub({ name: "", description: "", contact: "" });
      fetchData();
    }
  }

  async function deleteClub(id) {
    await fetch(`http://localhost:5000/api/clubs/${id}`, { method: "DELETE" });
    fetchData();
  }

  async function addEvent() {
    const res = await fetch("http://localhost:5000/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });
    if (res.ok) {
      setNewEvent({ clubId: "", title: "", date: "", venue: "" });
      fetchData();
    }
  }

  async function deleteEvent(id) {
    await fetch(`http://localhost:5000/api/events/${id}`, { method: "DELETE" });
    fetchData();
  }

  async function registerForEvent(eventId) {
    await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, userId: testUserId, userName: testUserName }),
    });
    alert("✅ Registered successfully!");
  }

  return (
    <div className="container fade-in">
      <header className="fade-down">
        <h1>🎓 Club Activity Portal</h1>
        <p className="subtitle">{backendMessage}</p>
      </header>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          {/* Club Form */}
          <section className="form-section fade-up">
            <h2><FaPlus /> Add New Club</h2>
            <input placeholder="Club Name" value={newClub.name} onChange={(e) => setNewClub({ ...newClub, name: e.target.value })} />
            <input placeholder="Description" value={newClub.description} onChange={(e) => setNewClub({ ...newClub, description: e.target.value })} />
            <input placeholder="Contact Email" value={newClub.contact} onChange={(e) => setNewClub({ ...newClub, contact: e.target.value })} />
            <button className="btn add" onClick={addClub}><FaPlus /> Add Club</button>
          </section>

          {/* Clubs */}
          <section className="fade-up">
            <h2>📌 Clubs</h2>
            <div className="grid">
              {clubs.map((club) => (
                <div className="card pop-in" key={club.id}>
                  <h3><FaBuilding /> {club.name}</h3>
                  <p>{club.description}</p>
                  <p className="contact"><FaEnvelope /> {club.contact}</p>
                  <button className="btn delete" onClick={() => deleteClub(club.id)}>
                    <FaTrash /> Delete
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Event Form */}
          <section className="form-section fade-up">
            <h2><FaPlus /> Add New Event</h2>
            <select value={newEvent.clubId} onChange={(e) => setNewEvent({ ...newEvent, clubId: Number(e.target.value) })}>
              <option value="">Select Club</option>
              {clubs.map((club) => (
                <option key={club.id} value={club.id}>{club.name}</option>
              ))}
            </select>
            <input placeholder="Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
            <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
            <input placeholder="Venue" value={newEvent.venue} onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })} />
            <button className="btn add" onClick={addEvent}><FaPlus /> Add Event</button>
          </section>

          {/* Events */}
          <section className="fade-up">
            <h2>🎯 Events</h2>
            <div className="grid">
              {events.map((event) => (
                <div className="card pop-in" key={event.id}>
                  <h3>{event.title}</h3>
                  <p><FaCalendarAlt /> {event.date}</p>
                  <p><FaMapMarkerAlt /> {event.venue}</p>
                  <p>🏛 Club: {event.clubName}</p>
                  <div className="button-group">
                    <button className="btn register" onClick={() => registerForEvent(event.id)}>
                      <FaSignInAlt /> Register
                    </button>
                    <button className="btn delete" onClick={() => deleteEvent(event.id)}>
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default App;
