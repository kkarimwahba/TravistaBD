const Newsletter = require("../models/newsletter");
const Notification = require("../models/notification");

// Subscribe a new user
const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    let user = await Newsletter.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    const newSubscription = new Newsletter({ email });
    await newSubscription.save();
    const notification = new Notification({
      type: "Newsletter",
      description: `New newsletter subscription from ${newSubscription.email}`,
    });
    await notification.save();

    res.status(201).json({
      message: "Subscribed successfully",
      subscriber: newSubscription,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscriberId: 1 });
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch subscribers", error });
  }
};
const unsubscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await Newsletter.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found" });

    user.subscribed = false;
    await user.save();

    res.status(200).json({ message: "Unsubscribed successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
const deleteSubscriber = async (req, res) => {
  try {
    const { email } = req.body;

    const deletedUser = await Newsletter.findOneAndDelete({ email });
    if (!deletedUser)
      return res.status(404).json({ message: "Email not found" });

    res.status(200).json({ message: "Subscriber deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete subscriber", error });
  }
};

module.exports = {
  subscribeNewsletter,
  getAllSubscribers,
  unsubscribeNewsletter,
  deleteSubscriber,
};
