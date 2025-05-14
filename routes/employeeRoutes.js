const express = require("express");
const {
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  toggleEmployeeStatus,
} = require("../controllers/employeeController.js");

// const {
//   isAuthenticated,
//   authorizeRoles,
// } = require("../middleware/employeeAuthMiddleware.js");

const router = express.Router();

router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
router.patch("/:id/toggle-status", toggleEmployeeStatus);

module.exports = router; // Use module.exports for CommonJS
