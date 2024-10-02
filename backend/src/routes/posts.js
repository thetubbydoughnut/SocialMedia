const express = require('express');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// File size limit (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed file types
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: MAX_FILE_SIZE }
});

// Error handling middleware
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File is too large. Maximum size is 5MB.' });
    }
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

router.get('/', auth, async (req, res) => {
  try {
    const posts = await req.db('posts')
      .leftJoin('users', 'posts.user_id', 'users.id')
      .select('posts.*', 'users.username')
      .orderBy('posts.created_at', 'desc');

    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error', error: error.message, stack: error.stack });
  }
});

router.post('/', auth, upload.single('image'), handleUploadError, async (req, res) => {
  const { content } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;

  if (!content && !imageUrl) {
    return res.status(400).json({ message: 'Post must contain either text content or an image.' });
  }

  try {
    const [postId] = await req.db('posts').insert({
      user_id: req.user.id,
      content,
      image_url: imageUrl,
      created_at: new Date()
    });

    const post = await req.db('posts')
      .join('users', 'posts.user_id', 'users.id')
      .where('posts.id', postId)
      .first()
      .select('posts.*', 'users.username');

    res.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message,
      stack: error.stack
    });
  }
});

router.put('/:id', auth, async (req, res) => {
  const { content } = req.body;

  try {
    const post = await req.db('posts').where({ id: req.params.id, user_id: req.user.id }).first();

    if (!post) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }

    await req.db('posts').where({ id: req.params.id }).update({ content });

    const updatedPost = await req.db('posts')
      .join('users', 'posts.user_id', 'users.id')
      .where('posts.id', req.params.id)
      .first()
      .select('posts.*', 'users.username');

    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await req.db('posts').where({ id: req.params.id, user_id: req.user.id }).first();

    if (!post) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }

    await req.db('posts').where({ id: req.params.id }).del();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;