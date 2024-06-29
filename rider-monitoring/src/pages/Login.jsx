import React, { useState } from "react";
import "../styles/Login.css"; // Create this file for styling if needed

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Temporary login logic
    if (username === "admin" && password === "123") {
      onLogin();
      localStorage.setItem("isLoggedIn", "true");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: "17%" }}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
        </div>
        <p style={{marginRight:"120px"}}><a href="/"> Forget Username/Password</a></p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
