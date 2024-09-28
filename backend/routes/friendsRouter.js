const express = require('express');
const router = express.Router({ mergeParams: true }); // Merge parent params
const authMiddleware = require('../middleware/authMiddleware');
const Friend = require('../models/FriendModel')
const User = require('../models/userModel');
const { Op } = require('sequelize');

// Fetch Friends
router.get('/', authMiddleware, async (req, res) => {
    const { username } = req.params; // Extract username from merged params
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const friends = await Friend.findAll({
            where: {
                [Op.or]: [
                    { senderId: user.id, status: 'accepted' },
                    { receiverId: user.id, status: 'accepted' },
                ],
            },
            include: [
                { model: User, as: 'sender', attributes: ['id', 'username', 'profilePhoto', 'bio'] },
                { model: User, as: 'receiver', attributes: ['id', 'username', 'profilePhoto', 'bio'] },
            ],
        });

        // Transform the data to return a list of friends
        const friendList = friends.map(friend => {
            const isSender = friend.senderId === user.id;
            const friendUser = isSender ? friend.receiver : friend.sender;
            return {
                id: friendUser.id,
                username: friendUser.username,
                profilePhoto: friendUser.profilePhoto,
                bio: friendUser.bio
            };
        });

        res.json(friendList);
    } catch (error) {
        console.error('Error fetching friends:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Send Friend Request
router.post('/send', authMiddleware, async (req, res) => {
    const { receiverId } = req.body;
    try {
        const friendRequest = await Friend.create({
            senderId: req.user.id,
            receiverId,
        });
        res.json(friendRequest);
    } catch (error) {
        console.error('Error sending friend request:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Respond to Friend Request
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
        console.error('Error responding to friend request:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;