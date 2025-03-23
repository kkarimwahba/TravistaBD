const express = require("express");
const router = express.Router();
const formController = require("../controllers/formLeadController");

router.post("/submit", formController.createForm);
router.get("/all", formController.getAllForms);
router.get("/:type", formController.getFormsByType);
router.delete("/:id", formController.deleteForm);

module.exports = router;
