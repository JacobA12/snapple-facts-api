import React, { useEffect, useState } from "react";
import "./App.css";

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
}
export default App;
