const express = require('express');
const router = express.Router();

let messages = []; // In-memory storage for messages

// Get all messages
router.get('/', (req, res) => {
    res.json(messages);
});

// Send a new message
router.post('/', (req, res) => {
    const { sender, receiver, content } = req.body;
    const newMessage = { sender, receiver, content, timestamp: new Date() };
    messages.push(newMessage);
    res.status(201).json(newMessage);
});

module.exports = router;