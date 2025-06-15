// routes/employeeRoutes.js
const express = require("express");
const {
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  toggleEmployeeStatus,
} = require("../controllers/employeeController.js");

const {
  verifyEmployeeToken,
  authorizeRoles,
} = require("../middleware/verifyEmployeeToken.js");

const router = express.Router();

// Apply protection per route for clarity and flexibility
router.get("/", verifyEmployeeToken, authorizeRoles("admin"), getAllEmployees);
router.get(
  "/:id",
  verifyEmployeeToken,
  authorizeRoles("admin"),
  getEmployeeById
);
router.put(
  "/:id",
  verifyEmployeeToken,
  authorizeRoles("admin"),
  updateEmployee
);
router.delete(
  "/:id",
  verifyEmployeeToken,
  authorizeRoles("admin"),
  deleteEmployee
);
router.patch(
  "/:id/toggle-status",
  verifyEmployeeToken,
  authorizeRoles("admin"),
  toggleEmployeeStatus
);

module.exports = router;
