const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage: storage });

// Create a new post
router.post('/', authMiddleware, upload.single('media'), postsController.createPost);

// Get all posts
router.get('/', postsController.getAllPosts);

// Get a specific post
router.get('/:id', postsController.getPostById);

// Update a post
router.put('/:id', authMiddleware, postsController.updatePost);

// Delete a post
router.delete('/:id', authMiddleware, postsController.deletePost);

module.exports = router;