const express = require('express');
const router = express.Router();
const db = require('../db'); // Ensure this path is correct

// Fetch trending hashtags
router.get('/trending', async (req, res) => {
    try {
        const trendingHashtags = await new Promise((resolve, reject) => {
            db.all('SELECT name, count FROM hashtags ORDER BY count DESC LIMIT 10', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
        res.json(trendingHashtags);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch trending hashtags' });
    }
});

module.exports = router;