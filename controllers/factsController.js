const fs = require("fs");
const path = require("path");
let facts = require("../data/facts.json");

const dataPath = path.join(__dirname, "../data/facts.json");

exports.getAllFacts = (req, res) => {
  res.json(facts);
};

exports.getFactById = (req, res) => {
  const id = parseInt(req.params.id);
  const fact = facts.find((f) => f.id === id);
  if (!fact) return res.status(404), json({ message: "Fact not found" });
  res.json(fact);
};

exports.createFact = (req, res) => {
  const { id, text } = req.body;

  const existing = facts.find((f) => f.id === id);
  if (existing) {
    return res
      .status(400)
      .json({ message: "Fact with that ID already exists." });
  }

  const newFact = { id, text };
  facts.push(newFact);

  fs.writeFile(dataPath, JSON.stringify(facts, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to save fact." });
    }
    res.status(201).json(newFact);
  });
};

exports.deleteFact = (req, res) => {
  const id = parseInt(req.params.id);
  const idx = facts.findIndex((f) => f.id === id);

  if (idx === -1) {
    return res.status(404).json({ message: "Fact not found." });
  }

  facts.splice(idx, 1);
  fs.writeFile(dataPath, JSON.stringify(facts, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to delete fact." });
    }
    res.json({ message: "Fact deleted." });
  });
};
