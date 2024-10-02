const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const notifications = await req.db.schema.hasTable('notifications').then(exists => {
      if (exists) {
        return req.db('notifications')
          .where('user_id', req.user.id)
          .orderBy('created_at', 'desc');
      } else {
        return [];
      }
    });

    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server error', error: error.message, stack: error.stack });
  }
});

// Implement other notification routes (e.g., marking as read) with similar error logging

module.exports = router;