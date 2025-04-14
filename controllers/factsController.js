let facts = require("../data/facts.json");

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
  const { text } = req.body;
  const id = parseInt(req.params.id);
  const newFact = {
    id: id,
    text,
  };
  facts.push(newFact);
  res.status(201).json(newFact);
};

exports.deleteFact = (req, res) => {
  const id = parseInt(req.params.id);
  facts = facts.filter((f) => f.id !== id);
  res.json({ message: "Fact deleted" });
};
