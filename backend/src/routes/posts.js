const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const posts = await req.db('posts')
      .join('users', 'posts.user_id', 'users.id')
      .select('posts.*', 'users.username')
      .orderBy('posts.created_at', 'desc');

    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  const { content } = req.body;

  try {
    const [postId] = await req.db('posts').insert({
      user_id: req.user.id,
      content,
      created_at: new Date()
    });

    const post = await req.db('posts')
      .join('users', 'posts.user_id', 'users.id')
      .where('posts.id', postId)
      .first()
      .select('posts.*', 'users.username');

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
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