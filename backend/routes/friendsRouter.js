const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Friend = require('../models/FriendModel')
const User = require('../models/userModel');

router.post('/send', authMiddleware, async (req, res) => {
    const { receiverId } = req.body;
    try {
        const friendRequest = await Friend.create({
            senderId: req.user.id,
            receiverId,
        });
        res.json(friendRequest);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/respond', authMiddleware, async (req, res) => {
    const { senderId, status } = req.body;
    try {
        const friendRequest = await Friend.findOne({
            where: { senderId, receiverId: req.user.id },
        });
        if (!friendRequest) {
            return res.status(404).json({ message: 'Friend request not found' });
        }
        friendRequest.status = status;
        await friendRequest.save();
        res.json(friendRequest);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/list', authMiddleware, async (req, res) => {
    try {
        const friends = await Friend.findAll({
            where: {
                [Op.or]: [
                    { senderId: req.user.id, status: 'accepted' },
                    { receiverId: req.user.id, status: 'accepted' },
                ],
            },
            include: [
                { model: User, as: 'sender', attributes: ['id', 'username'] },
                { model: User, as: 'receiver', attributes: ['id', 'username'] },
            ],
        });
        res.json(friends);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;