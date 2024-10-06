const Comment = require('../models/Comment'); // Adjust the path as needed

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (error) {
    console.error('Error fetching all comments:', error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
};

exports.getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.findByPostId(postId);
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments for post:', error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const userId = req.user.id; // Assuming you have user info in req.user from auth middleware

    if (!postId || !content) {
      return res.status(400).json({ message: 'PostId and content are required' });
    }

    const newComment = await Comment.create({
      postId,
      userId,
      content
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Error creating comment' });
  }
};

// Initialize socket (you might want to move this to a separate file)
exports.initializeSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};