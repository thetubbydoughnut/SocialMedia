const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const authMiddleware = require('../middleware/auth');

// Create a new post
router.post('/', authMiddleware, postsController.createPost);

// Get all posts
router.get('/', postsController.getAllPosts);

// Get a specific post
router.get('/:id', postsController.getPostById);

// Update a post
router.put('/:id', authMiddleware, postsController.updatePost);

// Delete a post
router.delete('/:id', authMiddleware, postsController.deletePost);

module.exports = router;