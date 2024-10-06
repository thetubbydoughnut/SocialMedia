const knex = require('../config/database');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.createPost = [
  upload.single('image'),
  async (req, res) => {
    try {
      const { title, content } = req.body;
      const userId = req.user.id;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      const post = await knex('posts').insert({
        title,
        content,
        userId, // This matches your current column name
        imageUrl,
        // No need to set created_at and updated_at, they have default values
      }).returning('*');

      res.status(201).json(post[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating post' });
    }
  }
];

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await knex('posts')
      .select('posts.*', 'users.username')
      .join('users', 'posts.userId', '=', 'users.id')
      .orderBy('posts.created_at', 'desc');
    
    res.json(posts);
  } catch (error) {
    console.error('Error in getAllPosts:', error);
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await knex('posts')
      .where({ id: req.params.id })
      .first();

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching post' });
  }
};

exports.updatePost = [
  upload.single('image'),
  async (req, res) => {
    try {
      const { title, content } = req.body;
      const post = await knex('posts')
        .where({ id: req.params.id })
        .first();

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      if (post.userId !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to update this post' });
      }

      const imageUrl = req.file ? `/uploads/${req.file.filename}` : post.imageUrl;

      const updatedPost = await knex('posts')
        .where({ id: req.params.id })
        .update({
          title,
          content,
          imageUrl,
          // updated_at will be automatically set by SQLite
        })
        .returning('*');

      res.json(updatedPost[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating post' });
    }
  }
];

exports.deletePost = async (req, res) => {
  try {
    const post = await knex('posts')
      .where({ id: req.params.id })
      .first();

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await knex('posts')
      .where({ id: req.params.id })
      .del();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting post' });
  }
};