const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const auth = require('../middleware/auth');

// Route to get all comments
router.get('/', commentsController.getAllComments);

// Route to get comments by post ID
router.get('/post/:postId', commentsController.getCommentsByPostId);

// Route to create a new comment
router.post('/', auth, commentsController.createComment);

module.exports = router;