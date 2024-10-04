const express = require('express');
const router = express.Router();

// Dummy user data for demonstration
const users = {
  user1: { username: 'user1', bio: 'Hello, I am user1!', posts: [1], followers: [], following: [] },
  user2: { username: 'user2', bio: 'Hello, I am user2!', posts: [2], followers: [], following: [] },
  test: { username: 'test', bio: 'This is a test user', posts: [], followers: [], following: [] }
};

router.get('/:username', async (req, res) => {
  const { username } = req.params;
  const user = users[username];
  
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;