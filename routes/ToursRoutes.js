// routes/tourRoutes.js
const express = require("express");
const router = express.Router();
const tourController = require("../controllers/toursController");

router.post("/", tourController.createTour);
router.get("/", tourController.getTours);
router.get("/:id", tourController.getTourById);
router.put("/:id", tourController.updateTour);
router.delete("/:id", tourController.deleteTour);

module.exports = router;
