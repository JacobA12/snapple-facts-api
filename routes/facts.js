const express = require("express");
const router = express.Router();
const factsController = require("../controllers/factsController");
const authenticateToken = require("../middleware/auth"); // Import middleware

// Protect these routes
router.use(authenticateToken);

router.get("/", factsController.getAllFacts);
router.get("/:id", factsController.getFactById);
router.post("/", factsController.createFact);
router.delete("/:id", factsController.deleteFact);

module.exports = router;
