// routes/notificationRoutes.js
const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationsController");

// Create a new notification
router.post("/", notificationController.createNotification);

// Get all notifications
router.get("/", notificationController.getAllNotifications);

// Mark a notification as read
router.patch("/:id/read", notificationController.markAsRead);

module.exports = router;
