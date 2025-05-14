const express = require("express");
const { register, login, logout } = require("../controllers/empAuthController");
const { isAuthenticated } = require("../middleware/employeeAuthMiddleware");

const router = express.Router();

// Registration route (for admin or public depending on access)
router.post("/register", register);

// Login route
router.post("/login", login);

// Logout route (must be authenticated)
router.post("/logout", isAuthenticated, logout);
router.get("/session", (req, res) => {
  if (req.session && req.session.employee) {
    return res.status(200).json({ employee: req.session.employee });
  }
  res.status(401).json({ message: "Not authenticated" });
});

module.exports = router;
