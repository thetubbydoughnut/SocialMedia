const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const Friend = require('../models/Friend');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../config/database');

// Multer setup for media uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/stories/';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Create a new story
router.post('/', authMiddleware, upload.single('media'), async (req, res) => {
    const { expiresInHours = 24 } = req.body; // Default expiration: 24 hours
    try {
        const story = await Story.create({
            user_id: req.user.id,
            media_url: `/uploads/stories/${req.file.filename}`,
            expires_at: new Date(Date.now() + expiresInHours * 60 * 60 * 1000)
        });

        // Emit the new story via Socket.io (optional)
        const io = req.app.get('io');
        io.emit('new_story', story);

        res.status(201).json(story);
    } catch (error) {
        console.error('Error creating story:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get current user's stories
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const stories = await Story.findAllByUser(req.user.id);
        res.json(stories);
    } catch (error) {
        console.error('Error fetching stories:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get stories from friends
router.get('/friends', authMiddleware, async (req, res) => {
    try {
        const friends = await Friend.getFriends(req.user.id);
        const friendIds = friends.map(f => f.user_id === req.user.id ? f.friend_id : f.user_id);

        if (friendIds.length === 0) {
            return res.json([]);
        }

        const stories = await Story.getStoriesForFeed(friendIds);
        res.json(stories);
    } catch (error) {
        console.error('Error fetching friends\' stories:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;