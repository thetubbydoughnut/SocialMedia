const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/:postId', async (req, res) => {
  try {
    const comments = await req.db('comments')
      .join('users', 'comments.user_id', 'users.id')
      .where('comments.post_id', req.params.postId)
      .select('comments.*', 'users.username')
      .orderBy('comments.created_at', 'desc');

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  const { postId, content } = req.body;

  try {
    const [commentId] = await req.db('comments').insert({
      user_id: req.user.id,
      post_id: postId,
      content,
      created_at: new Date()
    });

    const comment = await req.db('comments')
      .join('users', 'comments.user_id', 'users.id')
      .where('comments.id', commentId)
      .first()
      .select('comments.*', 'users.username');

    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  const { content } = req.body;

  try {
    const comment = await req.db('comments').where({ id: req.params.id, user_id: req.user.id }).first();

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found or unauthorized' });
    }

    await req.db('comments').where({ id: req.params.id }).update({ content });

    const updatedComment = await req.db('comments')
      .join('users', 'comments.user_id', 'users.id')
      .where('comments.id', req.params.id)
      .first()
      .select('comments.*', 'users.username');

    res.json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const comment = await req.db('comments').where({ id: req.params.id, user_id: req.user.id }).first();

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found or unauthorized' });
    }

    await req.db('comments').where({ id: req.params.id }).del();

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;