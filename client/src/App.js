import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import AdminPanel from "./pages/AdminPanel";
import EventHeadPanel from "./pages/EventHeadPanel";
import UserPanel from "./pages/UserPanel";
import ManageClubs from "./pages/ManageClubs"; // ✅ import

function App() {
  const [role, setRole] = useState("");

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) setRole(savedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    setRole("");
  };

  return (
    <Router>
      <Navbar role={role} onLogout={handleLogout} />

      <Routes>
        {/* Default route */}
        <Route
          path="/"
          element={
            role === "admin" ? <Navigate to="/admin" /> :
            role === "eventhead" ? <Navigate to="/eventhead" /> :
            role === "user" ? <Navigate to="/user" /> :
            <Navigate to="/login" />
          }
        />

        {/* Login */}
        <Route path="/login" element={<Login setRole={setRole} />} />

        {/* Admin pages */}
        <Route path="/admin" element={role === "admin" ? <AdminPanel /> : <Navigate to="/login" />} />
        <Route path="/manage-clubs" element={role === "admin" ? <ManageClubs /> : <Navigate to="/login" />} /> {/* ✅ added */}

        {/* Event Head pages */}
        <Route path="/eventhead" element={role === "eventhead" ? <EventHeadPanel /> : <Navigate to="/login" />} />

        {/* User pages */}
        <Route path="/user" element={role === "user" ? <UserPanel /> : <Navigate to="/login" />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
