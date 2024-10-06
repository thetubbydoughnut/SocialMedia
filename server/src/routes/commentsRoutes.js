const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const auth = require('../middleware/auth');

// Ensure you have the correct path to your controller
const { createComment } = require('../controllers/commentController');

router.get('/', commentsController.getAllComments);
router.get('/post/:postId', commentsController.getCommentsByPostId);
router.post('/', createComment);

module.exports = router;