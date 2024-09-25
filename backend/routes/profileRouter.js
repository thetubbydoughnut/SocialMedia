const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/userModel'); // Ensure you have the User model

router.get('/', (req, res) => {
    res.json({ message: 'Profile Page' });
});

router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            id: user.id,
            username: user.username,
            bio: user.bio,
            profilePhoto: user.profilePhoto,
            coverPhoto: user.coverPhoto,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            id: user.id,
            username: user.username,
            bio: user.bio,
            profilePhoto: user.profilePhoto,
            coverPhoto: user.coverPhoto,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;