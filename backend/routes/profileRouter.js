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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, `${req.user.id}-${Date.now()}${ext}`);
    },
});

const upload = multer({ storage: storage });

// Get all profiles (for admin purposes, consider removing in production)
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'bio', 'profilePhoto', 'coverPhoto'],
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get current user's profile
router.get('/me', authMiddleware, async (req, res) => {
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

// Get profile by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
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

// Update profile
router.put('/:id', authMiddleware, async (req, res) => {
    if (parseInt(req.params.id) !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized to update this profile' });
    }

    const { username, bio } = req.body;

    try {
        const user = await User.findByPk(req.params.id);
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
router.post('/:id/upload/profilePhoto', authMiddleware, upload.single('profilePhoto'), async (req, res) => {
    if (parseInt(req.params.id) !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized to update this profile' });
    }

    try {
        const user = await User.findByPk(req.params.id);
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
router.post('/:id/upload/coverPhoto', authMiddleware, upload.single('coverPhoto'), async (req, res) => {
    if (parseInt(req.params.id) !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized to update this profile' });
    }

    try {
        const user = await User.findByPk(req.params.id);
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

module.exports = router;