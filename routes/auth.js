const express = require("express");
const router = express.Router();
// Import the controller
const authController = require("../controllers/authController");

// User Registration
router.post("/register", authController.registerUser);

// User Login
router.post("/login", authController.loginUser);

module.exports = router;
