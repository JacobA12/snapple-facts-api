import React from "react";
import PropTypes from "prop-types";

function FactCard({ id, text }) {
  return (
    <div className="fact-card" style={styles.card}>
      <h3 style={styles.title}>Fact #{id}</h3>
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
  title: {
    marginBottom: "0.5rem",
    color: "#333",
  },
  text: {
    fontSize: "1rem",
    color: "#555",
  },
};

export default FactCard;
