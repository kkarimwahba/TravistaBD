const express = require("express");
const { register, login, logout } = require("../controllers/empAuthController");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/employeeAuthMiddleware");

const router = express.Router();

// Registration route (admin only)
router.post("/register", isAuthenticated, authorizeRoles("admin"), register);

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
