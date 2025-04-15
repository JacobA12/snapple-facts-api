const Fact = require("../models/Fact"); // import your Mongoose model

// GET all Snapple facts
exports.getAllFacts = async (req, res) => {
  try {
    const facts = await Fact.find();
    res.json(facts);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET a specific Snapple fact by ID
exports.getFactById = async (req, res) => {
  try {
    const fact = await Fact.findOne({ id: req.params.id });
    if (!fact) {
      return res.status(404).json({ message: "Fact not found" });
    }
    res.json(fact);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST a new Snapple fact
exports.createFact = async (req, res) => {
  try {
    const { id, text } = req.body;

    // Check if the fact already exists
    const exists = await Fact.findOne({ id });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Fact with this ID already exists" });
    }

    const newFact = new Fact({ id, text });
    await newFact.save();

    res.status(201).json(newFact);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE a Snapple fact by ID
exports.deleteFact = async (req, res) => {
  try {
    const result = await Fact.deleteOne({ id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Fact not found" });
    }

    res.json({ message: "Fact deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
