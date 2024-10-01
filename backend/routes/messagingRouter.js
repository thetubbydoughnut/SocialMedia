const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const User = require('../models/user');

// Create a new chat (direct or group)
router.post('/chats', authMiddleware, async (req, res) => {
    const { isGroup, name, userIds } = req.body; // userIds: array of user IDs to include in the chat

    try {
        const chat = await Chat.createChat(isGroup, name);

        // Add users to chat
        for (const userId of userIds) {
            await Chat.addUserToChat(chat.id, userId);
        }

        res.status(201).json(chat);
    } catch (error) {
        console.error('Error creating chat:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all chats for the authenticated user
router.get('/chats', authMiddleware, async (req, res) => {
    try {
        const chats = await Chat.getUserChats(req.user.id);
        res.json(chats);
    } catch (error) {
        console.error('Error fetching chats:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get messages for a specific chat
router.get('/chats/:chatId/messages', authMiddleware, async (req, res) => {
    const { chatId } = req.params;

    try {
        const messages = await Message.getChatMessages(chatId);
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Send a message in a chat
router.post('/chats/:chatId/messages', authMiddleware, async (req, res) => {
    const { chatId } = req.params;
    const { content, mediaUrl } = req.body;

    try {
        const message = await Message.createMessage({
            chat_id: chatId,
            sender_id: req.user.id,
            content,
            media_url: mediaUrl || null
        });

        // Emit the message via Socket.io
        const io = req.app.get('io');
        io.to(`chat_${chatId}`).emit('new_message', message);

        res.status(201).json(message);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;