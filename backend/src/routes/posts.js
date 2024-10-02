const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await req.db('posts').select('*').orderBy('created_at', 'desc');
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;