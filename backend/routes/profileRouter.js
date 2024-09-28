const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/userModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Protect all routes in this router with authMiddleware
router.use(authMiddleware);

// Get Current User Profile
router.get('/me', async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'username', 'bio', 'profilePhoto', 'coverPhoto'],
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get Profile by Username
router.get('/username/:username', async (req, res) => {
    try {
        const user = await User.findOne({
            where: { username: req.params.username },
            attributes: ['id', 'username', 'bio', 'profilePhoto', 'coverPhoto'],
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update Profile
router.put('/me', async (req, res) => {
    try {
        const { username, bio } = req.body;
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.username = username || user.username;
        user.bio = bio || user.bio;
        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Upload Profile Photo
router.post('/me/profilePhoto', upload.single('profilePhoto'), async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.profilePhoto = `/uploads/${req.file.filename}`;
        await user.save();

        res.json({ profilePhoto: user.profilePhoto });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Upload Cover Photo
router.post('/me/coverPhoto', upload.single('coverPhoto'), async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.coverPhoto = `/uploads/${req.file.filename}`;
        await user.save();

        res.json({ coverPhoto: user.coverPhoto });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Similarly, add routes for coverPhoto, etc.

module.exports = router;