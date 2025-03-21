const express = require("express");
const {
  subscribeNewsletter,
  getAllSubscribers,
  unsubscribeNewsletter,
  deleteSubscriber,
} = require("../controllers/newsletterController");

const router = express.Router();

router.post("/subscribe", subscribeNewsletter); // Subscribe
router.get("/subscribers", getAllSubscribers); // Get all subscribers
router.put("/unsubscribe", unsubscribeNewsletter); // Unsubscribe
router.delete("/delete", deleteSubscriber); // Delete subscriber

module.exports = router;
