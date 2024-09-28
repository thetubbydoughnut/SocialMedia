const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('../config/knexinit'); // Ensure this path is correct

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

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

// Create a new post with file upload
router.post('/', upload.single('image'), (req, res) => {
    const newPost = {
        id: posts.length + 1,
        user: {
            name: 'Current User',
            profilePicture: 'https://via.placeholder.com/50'
        },
        ...req.body
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// Endpoint to get posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await db('posts').select('*');
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;