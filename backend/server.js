const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// --- Mock Data ---
let clubs = [
  { id: 1, name: "Coding Club", description: "For programmers and developers", contact: "coding@college.edu" },
  { id: 2, name: "Photography Club", description: "Capture and create memories", contact: "photo@college.edu" },
  { id: 3, name: "Drama Club", description: "Stage performances and acting", contact: "drama@college.edu" }
];

let events = [
  { id: 1, clubId: 1, title: "Hackathon 2025", date: "2025-08-20", venue: "Auditorium", posterUrl: "" },
  { id: 2, clubId: 2, title: "Photography Workshop", date: "2025-08-25", venue: "Lab 4", posterUrl: "" },
  { id: 3, clubId: 3, title: "Annual Play", date: "2025-09-10", venue: "Main Stage", posterUrl: "" }
];

let registrations = [
  { id: 1, eventId: 1, userId: "u101", userName: "Ravin", timestamp: "2025-08-01T10:00:00Z" }
];

let announcements = [
  { id: 1, clubId: 1, title: "New mentors joined", body: "We have two new mentors for the coding club.", date: "2025-07-15" }
];

// --- Basic Routes ---
app.get("/", (req, res) => res.send("Backend (Club Activity Portal) is running..."));
app.get("/api/message", (req, res) => res.json({ message: "Hello from backend (CRUD Ready)!" }));

// --- CLUBS ---
app.get("/api/clubs", (req, res) => res.json(clubs));
app.get("/api/clubs/:id", (req, res) => {
  const club = clubs.find(c => c.id === Number(req.params.id));
  if (!club) return res.status(404).json({ error: "Club not found" });
  res.json(club);
});
app.post("/api/clubs", (req, res) => {
  const newClub = { id: clubs.length + 1, ...req.body };
  clubs.push(newClub);
  res.status(201).json(newClub);
});
app.put("/api/clubs/:id", (req, res) => {
  const index = clubs.findIndex(c => c.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Club not found" });
  clubs[index] = { ...clubs[index], ...req.body };
  res.json(clubs[index]);
});
app.delete("/api/clubs/:id", (req, res) => {
  clubs = clubs.filter(c => c.id !== Number(req.params.id));
  res.json({ message: "Club deleted" });
});

// --- EVENTS ---
app.get("/api/events", (req, res) => {
  const expanded = events.map(ev => {
    const club = clubs.find(c => c.id === ev.clubId) || null;
    return { ...ev, clubName: club ? club.name : null };
  });
  res.json(expanded);
});
app.get("/api/events/:id", (req, res) => {
  const event = events.find(e => e.id === Number(req.params.id));
  if (!event) return res.status(404).json({ error: "Event not found" });
  const club = clubs.find(c => c.id === event.clubId) || null;
  res.json({ ...event, clubName: club ? club.name : null });
});
app.post("/api/events", (req, res) => {
  const newEvent = { id: events.length + 1, ...req.body };
  events.push(newEvent);
  res.status(201).json(newEvent);
});
app.put("/api/events/:id", (req, res) => {
  const index = events.findIndex(e => e.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Event not found" });
  events[index] = { ...events[index], ...req.body };
  res.json(events[index]);
});
app.delete("/api/events/:id", (req, res) => {
  events = events.filter(e => e.id !== Number(req.params.id));
  res.json({ message: "Event deleted" });
});

// --- ANNOUNCEMENTS ---
app.get("/api/announcements/:clubId", (req, res) => {
  const clubId = Number(req.params.clubId);
  res.json(announcements.filter(a => a.clubId === clubId));
});
app.post("/api/announcements", (req, res) => {
  const newAnn = { id: announcements.length + 1, date: new Date().toISOString().split("T")[0], ...req.body };
  announcements.push(newAnn);
  res.status(201).json(newAnn);
});

// --- REGISTRATIONS ---
app.get("/api/registrations/:userId", (req, res) => {
  const userRegs = registrations.filter(r => r.userId === req.params.userId);
  const result = userRegs.map(r => {
    const ev = events.find(e => e.id === r.eventId) || {};
    return { ...r, eventTitle: ev.title, eventDate: ev.date };
  });
  res.json(result);
});
app.get("/api/event-registrations/:eventId", (req, res) => {
  res.json(registrations.filter(r => r.eventId === Number(req.params.eventId)));
});
app.post("/api/register", (req, res) => {
  const newReg = {
    id: registrations.length + 1,
    timestamp: new Date().toISOString(),
    ...req.body
  };
  registrations.push(newReg);
  res.status(201).json(newReg);
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
