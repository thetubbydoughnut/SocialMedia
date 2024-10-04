const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const auth = require('../middleware/auth');

// Create a new post
router.post('/', auth, postsController.createPost);

// Get all posts
router.get('/', auth, postsController.getAllPosts);

// Get a specific post
router.get('/:id', postsController.getPostById);

// Update a post
router.put('/:id', auth, postsController.updatePost);

// Delete a post
router.delete('/:id', auth, postsController.deletePost);

module.exports = router;