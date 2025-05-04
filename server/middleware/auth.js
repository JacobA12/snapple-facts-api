const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    // No token provided
    return res.status(401).json({ message: "Authentication token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Token is invalid (expired, wrong signature, etc.)
      // Log the specific error for server-side debugging if needed
      // console.error("JWT Verification Error:", err.name, err.message);
      return res
        .status(403)
        .json({ message: "Invalid or expired token", error: err.name }); // Optionally include error name
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
