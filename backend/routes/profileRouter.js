const express = require('express');
const router = express.Router();
const friendsRouter = require('./friendsRouter'); // Import the friendsRouter
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const knex = require('../config/database'); // Import knex

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
        const user = await knex('users').where({ id: req.user.id }).first().select('id', 'username', 'bio', 'profilePhoto', 'coverPhoto');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get Profile by Username
router.get('/:username', async (req, res) => {
    try {
        const user = await knex('users').where({ username: req.params.username }).first().select('id', 'username', 'bio', 'profilePhoto', 'coverPhoto');
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
        const user = await knex('users').where({ id: req.user.id }).first();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await knex('users').where({ id: req.user.id }).update({
            username: username || user.username,
            bio: bio || user.bio
        });

        const updatedUser = await knex('users').where({ id: req.user.id }).first().select('id', 'username', 'bio', 'profilePhoto', 'coverPhoto');
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Upload Profile Photo
router.post('/me/profilePhoto', upload.single('profilePhoto'), async (req, res) => {
    try {
        const user = await knex('users').where({ id: req.user.id }).first();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await knex('users').where({ id: req.user.id }).update({
            profilePhoto: `/uploads/${req.file.filename}`
        });

        res.json({ profilePhoto: `/uploads/${req.file.filename}` });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Upload Cover Photo
router.post('/me/coverPhoto', upload.single('coverPhoto'), async (req, res) => {
    try {
        const user = await knex('users').where({ id: req.user.id }).first();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await knex('users').where({ id: req.user.id }).update({
            coverPhoto: `/uploads/${req.file.filename}`
        });

        res.json({ coverPhoto: `/uploads/${req.file.filename}` });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Search Profiles
router.get('/search/profiles', async (req, res) => {
    const { query } = req.query;
    try {
        const profiles = await knex('users').where('username', 'like', `%${query}%`).select('id', 'username', 'profilePhoto');
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Mount the friendsRouter under /profile/:username/friends
router.use('/:username/friends', friendsRouter);

module.exports = router;