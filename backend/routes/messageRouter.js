const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel');

// Get all messages
router.get('/', async (req, res) => {
    const messages = await Message.findAll();
    res.json(messages);
});

// Send a new message
router.post('/', async (req, res) => {
    const { senderId, receiverId, content } = req.body;
    const newMessage = await Message.create({ senderId, receiverId, content });
    res.status(201).json(newMessage);
});

module.exports = router;