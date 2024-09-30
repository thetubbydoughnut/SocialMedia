const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming you have a db module to interact with your database

// Search profiles
router.get('/profiles', async (req, res) => {
    const query = req.query.q;
    try {
        const profiles = await db.all('SELECT * FROM profiles WHERE username LIKE ?', [`%${query}%`]);
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search profiles' });
    }
});

// Search posts
router.get('/posts', async (req, res) => {
    const query = req.query.q;
    try {
        const posts = await db.all('SELECT * FROM posts WHERE content LIKE ?', [`%${query}%`]);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search posts' });
    }
});

module.exports = router;