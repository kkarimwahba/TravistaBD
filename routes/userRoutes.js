const express = require("express");
const {
  getUserById,
  updateUser,
  deleteUser,
  loginWithSession,
  logoutUser,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:id", authMiddleware, getUserById); // Get user by ID
router.put("/:id", authMiddleware, updateUser); // Update user
router.delete("/:id", authMiddleware, deleteUser); // Delete user
router.post("/session", loginWithSession); // Login with session
router.post("/logout", authMiddleware, logoutUser); // Logout

module.exports = router;
