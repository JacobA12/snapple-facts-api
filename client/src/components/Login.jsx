import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Store the token
        localStorage.setItem("token", data.token);
        onLogin(); // Notify parent component
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Log In
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: "1.5em",
    marginBottom: "15px",
    textAlign: "center",
    color: "#333",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1em",
  },
  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#5cb85c",
    color: "white",
    cursor: "pointer",
    fontSize: "1em",
  },
};

export default Login;
