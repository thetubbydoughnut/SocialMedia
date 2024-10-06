const Comment = require('../models/Comment');
const SocketService = require('../services/socketService');

let socketService;

// Initialize SocketService
const initializeSocket = (io) => {
  socketService = new SocketService(io);
};

// {{ edit_6 }} Modify createComment to emit Socket.io event
const createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const userId = req.user.id; // Assuming the user ID is available from the auth middleware
    const newComment = await Comment.create({ postId, content, userId });
    
    // Emit the new comment to all clients if socketService is initialized
    if (socketService) {
      socketService.sendNewComment(newComment);
    }
    
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Error creating comment' });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
};

exports.getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.findAllByPostId(postId);
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments for post:', error);
    res.status(500).json({ message: 'Error fetching comments for post' });
  }
};

module.exports = {
  initializeSocket,
  getAllComments: exports.getAllComments,
  getCommentsByPostId: exports.getCommentsByPostId,
  createComment: exports.createComment
};