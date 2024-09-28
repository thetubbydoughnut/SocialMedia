const express = require('express');
const router = express.Router();

let posts = [
    {
        id: 1,
        user: {
            name: 'John Doe',
            profilePicture: 'https://picsum.photos/50?random=1'
        },
        content: 'Had a great day hiking!',
        image: 'https://via.placeholder.com/500',
        reactions: {
            like: 10,
            love: 5,
            haha: 2,
            wow: 1,
            sad: 0,
            angry: 0
        },
        comments: [
            {
                user: 'Jane Smith',
                text: 'Looks amazing!'
            },
            {
                user: 'Alice Johnson',
                text: 'Wish I could join!'
            }
        ]
    },
    {
        id: 2,
        user: {
            name: 'Jane Smith',
            profilePicture: 'https://picsum.photos/50?random=2'
        },
        content: 'Just finished reading a great book!',
        image: 'https://via.placeholder.com/500',
        reactions: {
            like: 15,
            love: 8,
            haha: 1,
            wow: 3,
            sad: 0,
            angry: 0
        },
        comments: [
            {
                user: 'John Doe',
                text: 'What book was it?'
            }
        ]
    }
];

// Get all posts or filter by category
router.get('/', (req, res) => {
    const { category } = req.query;
    if (category) {
        const filteredPosts = posts.filter(post => post.category === category);
        res.json(filteredPosts);
    } else {
        res.json(posts);
    }
});

// Create a new post
router.post('/', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        user: {
            name: 'Current User',
            profilePicture: `https://picsum.photos/50?random=${posts.length + 1}`
        },
        ...req.body
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

module.exports = router;