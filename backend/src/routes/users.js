const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/:id', auth, async (req, res) => {
  try {
    const user = await req.db('users')
      .where({ id: req.params.id })
      .first()
      .select('id', 'username', 'email');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;