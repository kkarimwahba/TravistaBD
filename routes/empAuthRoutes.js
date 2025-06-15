const express = require("express");
const { register, login, logout } = require("../controllers/empAuthController");
// const { isAuthenticated } = require("../middleware/employeeAuthMiddleware");
const { verifyEmployeeToken } = require("../middleware/verifyEmployeeToken.js");

const router = express.Router();

// Registration route (for admin or public depending on access)
router.post("/register", register);

// Login route
router.post("/login", login);

// Logout route (must be authenticated)
router.post("/logout", logout);
router.get("/session", verifyEmployeeToken, (req, res) => {
  res.status(200).json({ employee: req.employee });
});

module.exports = router;
