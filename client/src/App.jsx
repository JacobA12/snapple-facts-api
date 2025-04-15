import React, { useEffect, useState } from "react";
import FactCard from "./FactCard";

function App() {
  const [allFacts, setAllFacts] = useState([]);
  const [randomFact, setRandomFact] = useState({});
  const [selectedFact, setSelectedFact] = useState({});

  useEffect(() => {
    const fetchFacts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/facts");
        const data = await res.json();
        console.log(data);
        setAllFacts(data);
      } catch (error) {
        console.error("Error fetching facts:", error);
      }
    };

    fetchFacts();
  }, []);

  const handleDelete = async (idToDelete) => {
    try {
      const res = await fetch(`http://localhost:3000/api/facts/${idToDelete}`, {
        method: "DELETE",
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

  return (
    <div>
      <h1>All Snapple Facts</h1>
      <ul>
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
  );
}
export default App;
