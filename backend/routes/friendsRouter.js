const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Friend = require('../models/Friend');
const User = require('../models/user');
const db = require('../config/database');

// Fetch Friends
router.get('/', authMiddleware, async (req, res) => {
    try {
        const friends = await Friend.getFriends(req.user.id);
        const friendIds = friends.map(f => f.user_id === req.user.id ? f.friend_id : f.user_id);

        if (friendIds.length === 0) {
            return res.json([]);
        }

        const friendsData = await db('users')
            .whereIn('id', friendIds)
            .select('id', 'username', 'profile_photo', 'bio');

        res.json(friendsData);
    } catch (error) {
        console.error('Error fetching friends:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Send Friend Request
router.post('/request/:friendId', authMiddleware, async (req, res) => {
    const { friendId } = req.params;
    const userId = req.user.id;

    try {
        const existingFriend = await Friend.findOne(userId, friendId);
        if (existingFriend) {
            return res.status(400).json({ message: 'Friend request already exists.' });
        }

        await Friend.create(userId, friendId);
        res.status(201).json({ message: 'Friend request sent.' });
    } catch (error) {
        console.error('Error sending friend request:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Accept Friend Request
router.post('/accept/:friendId', authMiddleware, async (req, res) => {
    const { friendId } = req.params;
    const userId = req.user.id;

    try {
        const existingFriend = await Friend.findOne(userId, friendId);
        if (!existingFriend) {
            return res.status(404).json({ message: 'Friend request not found.' });
        }

        await Friend.updateStatus(userId, friendId, 'accepted');
        res.json({ message: 'Friend request accepted.' });
    } catch (error) {
        console.error('Error accepting friend request:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Reject Friend Request
router.post('/reject/:friendId', authMiddleware, async (req, res) => {
    const { friendId } = req.params;
    const userId = req.user.id;

    try {
        const existingFriend = await Friend.findOne(userId, friendId);
        if (!existingFriend) {
            return res.status(404).json({ message: 'Friend request not found.' });
        }

        await Friend.updateStatus(userId, friendId, 'rejected');
        res.json({ message: 'Friend request rejected.' });
    } catch (error) {
        console.error('Error rejecting friend request:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;