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

router.get("/", isAuthenticated, authorizeRoles("admin"), getAllEmployees);
router.get("/:id", isAuthenticated, authorizeRoles("admin"), getEmployeeById);
router.put("/:id", isAuthenticated, authorizeRoles("admin"), updateEmployee);
router.delete("/:id", isAuthenticated, authorizeRoles("admin"), deleteEmployee);

module.exports = router; // Use module.exports for CommonJS
