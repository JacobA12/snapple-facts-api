import React, { useEffect, useState } from "react";
import "./App.css";
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

  return (
    <div>
      <h1>All Snapple Facts</h1>
      <ul>
        {allFacts.map((fact) => (
          <FactCard key={fact.id} id={fact.id} text={fact.text} />
        ))}
      </ul>
    </div>
  );
}
export default App;
