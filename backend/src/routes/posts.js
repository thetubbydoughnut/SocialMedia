const express = require('express');
const router = express.Router();

// Dummy data for demonstration
let posts = [
  { id: 1, content: 'Hello, Twitter!', username: 'user1', timestamp: new Date().toISOString() },
  { id: 2, content: 'This is a test tweet', username: 'user2', timestamp: new Date().toISOString() }
];

router.get('/', async (req, res) => {
  console.log('GET request received for /posts');
  try {
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newPost = {
      id: posts.length + 1,
      content: req.body.content,
      username: req.body.username || 'anonymous',
      timestamp: new Date().toISOString()
    };
    posts.unshift(newPost);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
});

module.exports = router;