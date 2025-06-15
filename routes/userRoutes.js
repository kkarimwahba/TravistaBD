// const express = require("express");
// const {
//   getUserById,
//   updateUser,
//   deleteUser,
//   loginWithSession,
//   logoutUser,
//   loginUser,
//   getUsers,
// } = require("../controllers/userController");
// const authMiddleware = require("../middleware/authMiddleware");
// const User = require("../models/user");

// const router = express.Router();

// router.get("/", getUsers); // Get all users
// // Get current logged-in user
// router.get("/me", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select(
//       "-password, -sessionToken"
//     ); // Exclude password
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });
// router.get("/:id", authMiddleware, getUserById); // Get user by ID
// router.put("/:id", authMiddleware, updateUser); // Update user
// router.delete("/:id", authMiddleware, deleteUser); // Delete user
// router.post("/session", loginWithSession); // Login with session
// router.post("/logout", authMiddleware, logoutUser); // Logout
// router.post("/login", loginUser); // Login

// module.exports = router;
const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getAllUsers,
} = require("../controllers/userController");

const { protect, isAdmin } = require("../middleware/usersMiddlwareAuth");

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected User Routes
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.delete("/profile", protect, deleteUserProfile);

// Admin Routes
router.get("/", protect, isAdmin, getAllUsers);

module.exports = router;
