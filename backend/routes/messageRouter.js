const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel');
const authMiddleware = require('../middleware/authMiddleware');
const io = require('../server').io; // Ensure io is exported from server.js

// Get messages between two users
router.get('/:userId', authMiddleware, async (req, res) => {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    try {
        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { senderId: req.user.id, receiverId: userId },
                    { senderId: userId, receiverId: req.user.id }
                ]
            },
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit),
            offset: (page - 1) * limit
        });
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Send a message
router.post('/', authMiddleware, async (req, res) => {
    const { receiverId, content } = req.body;
    try {
        const message = await Message.create({
            senderId: req.user.id,
            receiverId,
            content
        });

        // Emit the message to the receiver via Socket.io
        io.to(`user_${receiverId}`).emit('receiveMessage', message);

        res.status(201).json(message);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;