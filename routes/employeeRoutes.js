const express = require("express");
const {
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController.js");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/employeeAuthMiddleware.js");

const router = express.Router();

router.get("/", isAuthenticated, getAllEmployees);
router.get("/:id", isAuthenticated, getEmployeeById);
router.put("/:id", isAuthenticated, updateEmployee);
router.delete("/:id", isAuthenticated, deleteEmployee);

module.exports = router; // Use module.exports for CommonJS
