const express = require('express');
const router = express.Router();

// Dummy data for demonstration
let posts = [
  { id: 1, content: 'Hello, Twitter!', author: 'user1', likes: 0, timestamp: new Date().toISOString() },
  { id: 2, content: 'This is a test tweet', author: 'user2', likes: 0, timestamp: new Date().toISOString() }
];

router.get('/', async (req, res) => {
  res.json(posts);
});

router.post('/', async (req, res) => {
  const newPost = {
    id: posts.length + 1,
    content: req.body.content,
    author: req.body.author || 'anonymous',
    likes: 0,
    timestamp: new Date().toISOString()
  };
  posts.unshift(newPost);
  res.status(201).json(newPost);
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(post => post.id === id);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...req.body };
    res.json(posts[index]);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  posts = posts.filter(post => post.id !== id);
  res.status(204).send();
});

router.post('/:id/like', async (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(post => post.id === id);
  if (post) {
    post.likes += 1;
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

module.exports = router;