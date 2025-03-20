const express = require("express");
const {
  getUserById,
  updateUser,
  deleteUser,
  loginWithSession,
  logoutUser,
  loginUser,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:id", authMiddleware, getUserById); // Get user by ID
router.put("/:id", authMiddleware, updateUser); // Update user
router.delete("/:id", authMiddleware, deleteUser); // Delete user
router.post("/session", loginWithSession); // Login with session
router.post("/logout", authMiddleware, logoutUser); // Logout
router.post("/login", loginUser); // Login
// Get current logged-in user
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password, -sessionToken"
    ); // Exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
module.exports = router;
