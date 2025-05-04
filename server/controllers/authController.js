const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  if (password.length < 6) {
    // Example length check
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username: username,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    // Handle duplicate username error (MongoDB E11000)
    if (err.code === 11000) {
      return res.status(409).json({ message: "Username already exists" });
    }
    console.error("Registration Error:", err); // Log the actual error for debugging
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ username: username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Combine user not found and incorrect password for security (prevents username enumeration)
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h", // Use env var or default
    });
    res.json({ message: "Login successful", token: token });
  } catch (error) {
    console.error("Login Error:", error); // Log the actual error
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
