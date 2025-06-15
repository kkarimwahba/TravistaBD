// const User = require("../models/user");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // Get user by ID
// const getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // Update user
// const updateUser = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, phoneNumber, birthDate } =
//       req.body;

//     let updateFields = {};
//     if (firstName) updateFields.firstName = firstName;
//     if (lastName) updateFields.lastName = lastName;
//     if (phoneNumber) updateFields.phoneNumber = phoneNumber;
//     if (birthDate) updateFields.birthDate = birthDate;
//     if (email) updateFields.email = email;
//     if (password) {
//       updateFields.password = await bcrypt.hash(password, 10);
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       updateFields,
//       { new: true }
//     ).select("-password");
//     if (!updatedUser)
//       return res.status(404).json({ message: "User not found" });

//     res.status(200).json({ message: "User updated", updatedUser });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // Delete user
// const deleteUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.status(200).json({ message: "User deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // User Session (Login with session management)
// const loginWithSession = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) return res.status(400).json({ message: "User not found" });

//     // Ensure password field exists before comparing
//     if (!user.password)
//       return res.status(400).json({ message: "No password set" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Password might be wrong" });

//     // Generate JWT
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     // Store session token in DB
//     user.sessionToken = token;
//     await user.save();

//     // Store session token as a HTTP-only cookie
//     res.cookie("sessionToken", token, {
//       httpOnly: true, // Prevents JavaScript access
//       secure: process.env.NODE_ENV === "production", // Use Secure only in production
//       sameSite: "Strict", // Prevent CSRF attacks
//       maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
//     });

//     res.status(200).json({ message: "Login successful", userId: user._id });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // Logout User (Clear Session)
// const logoutUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.sessionToken = null;
//     await user.save();

//     res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).json({ message: "Invalid email or password" });

//     // Compare password
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid email or password" });

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "7d", // 7-day session
//       }
//     );

//     // Send token & user data in response
//     res.json({
//       token,
//       user: {
//         id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// // GET /api/users
// const getUsers = async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// };

// module.exports = {
//   getUsers,
//   getUserById,
//   updateUser,
//   deleteUser,
//   loginWithSession,
//   logoutUser,
//   loginUser,
// };
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// @desc    Register a new user
// @route   POST /api/users/register
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, birthDate } =
    req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      birthDate,
    });

    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id, user.role),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

// @desc    Login user
// @route   POST /api/users/login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Invalid email or password" });

    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id, user.role),
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/users/profile
exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
exports.updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const updates = req.body;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    Object.assign(user, updates);
    await user.save();

    res.json({ message: "Profile updated" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc    Delete user account
// @route   DELETE /api/users/profile
exports.deleteUserProfile = async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  res.json({ message: "Account deleted" });
};

// @desc    Get all users (admin)
// @route   GET /api/users
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};
