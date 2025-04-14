const express = require("express");
const router = express.Router();
const factsController = require("../controllers/factsController");

router.get("/", factsController.getAllFacts);
router.get("/:id", factsController.getFactById);
router.post("/", factsController.createFact);
router.delete("/:id", factsController.deleteFact);

module.exports = router;
