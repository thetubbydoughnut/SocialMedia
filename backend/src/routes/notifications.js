const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Fetch notifications logic here
    // For now, let's return a dummy response
    res.json([{ id: 1, message: 'This is a test notification' }]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications' });
  }
});

module.exports = router;