import React from "react";
import PropTypes from "prop-types";
import { FaTrashAlt } from "react-icons/fa";

function FactCard({ id, text, onDelete }) {
  return (
    <div className="fact-card" style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>Fact #{id}</h3>
        <FaTrashAlt
          style={styles.icon}
          onClick={() => {
            if (confirm(`Are you sure you want to delete fact #${id}?`)) {
              onDelete(id);
            }
          }}
        />
      </div>
      <p style={styles.text}>{text}</p>
    </div>
  );
}

FactCard.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "1rem",
    backgroundColor: "#f9f9f9",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    margin: 0,
  },
  text: {
    fontSize: "1rem",
    color: "#555",
  },
  icon: {
    cursor: "pointer",
    color: "#c0392b",
    fontSize: "1.2rem",
  },
};

export default FactCard;
