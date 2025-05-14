// controllers/notificationController.js
const Notification = require("../models/notification");

// Create a new notification (triggered when a form is submitted)
exports.createNotification = async (req, res) => {
  try {
    const { type, description } = req.body;

    const notification = new Notification({
      type,
      description,
    });

    const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all notifications (admin view)
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Mark a notification as read (irreversible)
exports.markAsRead = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    if (notification.isRead) {
      return res
        .status(200)
        .json({ message: "Notification already marked as read" });
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
