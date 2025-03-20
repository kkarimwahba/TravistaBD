const express = require("express");
const router = express.Router();
const visaLeadController = require("../controllers/visaleadController");

router.post("/", visaLeadController.createVisaLead);
router.get("/", visaLeadController.getVisaLeads);
// Get all visa leads for a specific user
router.get("/user/:userId", visaLeadController.getVisaLeadsByUser);
router.get("/:id", visaLeadController.getVisaLeadById);
router.put("/:id", visaLeadController.updateVisaLead);
router.delete("/:id", visaLeadController.deleteVisaLead);

module.exports = router;
