const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Notification = require('../models/notification');

// Get all notifications for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.getUserNotifications(req.user.id);
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark a notification as read
router.patch('/:id/read', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await Notification.markAsRead(id);
    res.json({ message: 'Notification marked as read.' });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;