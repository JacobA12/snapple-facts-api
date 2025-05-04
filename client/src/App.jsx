import React, { useEffect, useState } from "react";
import FactCard from "./FactCard";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [allFacts, setAllFacts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchFacts(token);
    }
  }, []);

  const fetchFacts = async (token) => {
    try {
      const res = await fetch("http://localhost:3000/api/facts", {
        headers: {
          Authorization: `Bearer ${token}`, // Include token
        },
      });
      const data = await res.json();
      setAllFacts(data);
    } catch (error) {
      console.error("Error fetching facts:", error);
    }
  };

  const handleDelete = async (idToDelete) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:3000/api/facts/${idToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Include token
        },
      });

      if (res.ok) {
        setAllFacts((prev) => prev.filter((f) => f.id !== idToDelete));
      } else {
        console.error("Failed to delete fact");
      }
    } catch (error) {
      console.error("Error deleting fact:", error);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    const token = localStorage.getItem("token");
    fetchFacts(token);
  };

  const handleRegister = () => {
    alert("Registration successful! Please log in.");
  };

  return (
    <div style={styles.appContainer}>
      {!isLoggedIn ? (
        <div style={styles.authContainer}>
          <Login onLogin={handleLogin} />
          <Register onRegister={handleRegister} />
        </div>
      ) : (
        <div style={styles.factsContainer}>
          <h1 style={styles.heading}>All Snapple Facts</h1>
          <ul style={styles.list}>
            {allFacts.map((fact) => (
              <FactCard
                key={fact.id}
                id={fact.id}
                text={fact.text}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const styles = {
  appContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f0f0f0",
    minHeight: "100vh",
  },
  authContainer: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    marginBottom: "20px",
  },
  factsContainer: {
    width: "80%",
    maxWidth: "800px",
  },
  heading: {
    fontSize: "2em",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
};

export default App;
