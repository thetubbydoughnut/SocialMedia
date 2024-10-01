const express = require('express');
const router = express.Router();
const Notification = require('../models/notificationModel');
const authMiddleware = require('../middleware/authMiddleware');

// Get current user's notifications
router.get('/', authMiddleware, async (req, res) => {
    try {
        const notifications = await Notification.findAll({
            where: { receiverId: req.user.id },
            order: [['createdAt', 'DESC']]
        });
        res.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Mark notification as read
router.put('/:id/read', authMiddleware, async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification || notification.receiverId !== req.user.id) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        notification.isRead = true;
        await notification.save();
        res.json(notification);
    } catch (error) {
        console.error('Error updating notification:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;