const express = require('express');
const router = express.Router();

let chats = [
    {
        id: 1,
        participants: [
            { name: 'John Doe', profilePicture: 'https://via.placeholder.com/50' },
            { name: 'Jane Smith', profilePicture: 'https://via.placeholder.com/50' }
        ],
        messages: [
            { sender: 'John Doe', text: 'Hi Jane!', timestamp: '2023-10-01T10:00:00Z' },
            { sender: 'Jane Smith', text: 'Hello John!', timestamp: '2023-10-01T10:01:00Z' },
            { sender: 'John Doe', text: 'How are you?', timestamp: '2023-10-01T10:02:00Z' },
            { sender: 'Jane Smith', text: 'I am good, thanks!', timestamp: '2023-10-01T10:03:00Z' }
        ]
    }
];

// Get all chats
router.get('/', (req, res) => {
    res.json(chats);
});

router.get('/:id', (req, res) => {
    const chat = chats.find(c => c.id === parseInt(req.params.id));
    if (chat) {
        res.json(chat);
    } else {
        res.status(404).json({ message: 'Chat not found' });
    }
});

module.exports = router;