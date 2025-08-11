import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login({ setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const users = {
    admin: { email: "admin@club.com", password: "admin123" },
    eventhead: { email: "event@club.com", password: "event123" },
    user: { email: "user@club.com", password: "user123" }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let loggedInRole = "";

    if (email === users.admin.email && password === users.admin.password) {
      loggedInRole = "admin";
    } else if (email === users.eventhead.email && password === users.eventhead.password) {
      loggedInRole = "eventhead";
    } else if (email === users.user.email && password === users.user.password) {
      loggedInRole = "user";
    } else {
      alert("Invalid email or password");
      return;
    }

    // Save role for persistence
    localStorage.setItem("role", loggedInRole);
    setRole(loggedInRole);

    // Redirect to role-specific page
    if (loggedInRole === "admin") navigate("/admin");
    if (loggedInRole === "eventhead") navigate("/eventhead");
    if (loggedInRole === "user") navigate("/user");
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
