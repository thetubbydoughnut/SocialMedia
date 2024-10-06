const Comment = require('../models/Comment'); // Adjust the path as needed

// Handler for creating a new comment
const createComment = async (req, res) => {
    try {
        const { postId, content, author } = req.body;
        
        // Validate input
        if (!postId || !content || !author) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Create and save the comment
        const newComment = new Comment({ postId, content, author });
        await newComment.save();

        return res.status(201).json(newComment);
    } catch (error) {
        console.error('Error creating comment:', error);
        return res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = {
    createComment,
};