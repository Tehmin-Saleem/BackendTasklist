const Notification = require("../models/notificationModel");

// Get all notifications
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single notification by user_id
exports.getNotificationByUserId = async (req, res) => {
  const { user_id } = req.params;
  try {
    const notification = await Notification.findOne({ user_id });
    if (notification) {
      res.json(notification);
    } else {
      res.status(404).json({ message: "Notification not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new notification
exports.createNotification = async (req, res) => {
  const { user_id, message, type, created_at } = req.body;
  const notification = new Notification({
    user_id,
    message,
    type,
    created_at
  });

  try {
    const newNotification = await notification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a notification by user_id
exports.updateNotificationByUserId = async (req, res) => {
  const { user_id } = req.params;
  try {
    const notification = await Notification.findOne({ user_id });
    if (notification) {
      notification.message = req.body.message || notification.message;
      notification.type = req.body.type || notification.type;
      // Update other notification properties here

      const updatedNotification = await notification.save();
      res.json(updatedNotification);
    } else {
      res.status(404).json({ message: "Notification not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a notification by user_id
exports.deleteNotificationByUserId = async (req, res) => {
  const { user_id } = req.params;
  try {
    const notification = await Notification.findOneAndDelete({ user_id });
    if (notification) {
      res.json({ message: "Notification deleted" });
    } else {
      res.status(404).json({ message: "Notification not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
