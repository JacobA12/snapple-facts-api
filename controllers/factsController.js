const Fact = require("../models/Fact");

// GET a Snapple fact by ID
exports.getFactById = async (req, res) => {
  try {
    const fact = await Fact.findOne({
      id: req.params.id,
      userId: req.user.userId,
    });

    if (!fact) {
      return res.status(404).json({ message: "Fact not found" });
    }

    res.json(fact);
  } catch (err) {
    console.error("Error in getFactById:", err); // Optional: Add server-side logging
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET all Snapple facts for a user
exports.getAllFacts = async (req, res) => {
  try {
    const facts = await Fact.find({ userId: req.user.userId }); // Filter by user
    res.json(facts);
  } catch (err) {
    console.error("Error in getAllFacts:", err); // Optional: Add server-side logging
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST a new Snapple fact
exports.createFact = async (req, res) => {
  try {
    const { id, text } = req.body;
    const userId = req.user.userId; // Get user ID from authenticated request

    // Basic Input Validation Example
    if (id === undefined || text === undefined || text.trim() === "") {
      return res
        .status(400)
        .json({ message: "Fact 'id' and non-empty 'text' are required" });
    }

    // Check if the fact already exists
    const exists = await Fact.findOne({ id });
    // Note: This checks for global uniqueness of 'id'. If 'id' should be unique per user, use: Fact.findOne({ id, userId })
    if (exists) {
      return res
        .status(400)
        .json({ message: "Fact with this ID already exists" });
    }

    const newFact = new Fact({ id, text, userId }); // Include userId
    await newFact.save();

    res.status(201).json(newFact);
  } catch (err) {
    console.error("Error in createFact:", err); // Optional: Add server-side logging
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE a Snapple fact by ID
exports.deleteFact = async (req, res) => {
  try {
    const result = await Fact.deleteOne({
      id: req.params.id,
      userId: req.user.userId,
    }); // Ensure user owns the fact

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Fact not found or not authorized" });
    }

    res.json({ message: "Fact deleted" });
  } catch (err) {
    console.error("Error in deleteFact:", err); // Optional: Add server-side logging
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
