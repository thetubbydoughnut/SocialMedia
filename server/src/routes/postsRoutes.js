const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const auth = require('../middleware/auth');
const knex = require('../config/database');

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

// Like a post
router.post('/:id/like', auth, postsController.likePost);

// Get comments for a post
router.get('/:id/comments', auth, postsController.getComments);

// Add a comment to a post
router.post('/:id/comments', auth, postsController.addComment);

// Test database connection
router.get('/test-db', async (req, res) => {
  try {
    const result = await knex.raw('SELECT 1+1 as result');
    res.json({ message: 'Database connection successful', result });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ message: 'Database connection error', error: error.message });
  }
});

// Get comment count
router.get('/comment-count', async (req, res) => {
  try {
    const count = await knex('comments').count('* as count').first();
    res.json({ message: 'Comment count', count: count.count });
  } catch (error) {
    console.error('Error counting comments:', error);
    res.status(500).json({ message: 'Error counting comments', error: error.message });
  }
});

// Get migration status
router.get('/migration-status', async (req, res) => {
  try {
    const migrations = await knex('knex_migrations').select('*');
    res.json({ migrations });
  } catch (error) {
    console.error('Error fetching migration status:', error);
    res.status(500).json({ message: 'Error fetching migration status', error: error.message });
  }
});

module.exports = router;