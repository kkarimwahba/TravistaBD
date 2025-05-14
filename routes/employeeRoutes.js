const express = require("express");
const {
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  toggleEmployeeStatus, // Add the new controller function
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
// Add the new route for toggling employee status
router.patch(
  "/:id/toggle-status",
  isAuthenticated,
  authorizeRoles("admin"),
  toggleEmployeeStatus
);

module.exports = router; // Use module.exports for CommonJS
