const mongoose = require("mongoose");

const factSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  text: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Add userId
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Fact", factSchema);
