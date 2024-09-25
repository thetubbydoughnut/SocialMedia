const express = require('express');
const router = express.Router();

let posts = [
    {
        id: 1,
        user: {
            name: 'John Doe',
            profilePicture: 'https://via.placeholder.com/50'
        },
        name: 'Mountain Bike',
        image: 'https://via.placeholder.com/150',
        price: '$200',
        description: 'A great mountain bike for all terrains.',
        category: 'Sports'
    },
    {
        id: 2,
        user: {
            name: 'Jane Smith',
            profilePicture: 'https://via.placeholder.com/50'
        },
        name: 'Laptop',
        image: 'https://via.placeholder.com/150',
        price: '$800',
        description: 'A powerful laptop for all your needs.',
        category: 'Electronics'
    },
    {
        id: 3,
        user: {
            name: 'Alice Johnson',
            profilePicture: 'https://via.placeholder.com/50'
        },
        name: 'Smartphone',
        image: 'https://via.placeholder.com/150',
        price: '$500',
        description: 'A latest model smartphone with all features.',
        category: 'Electronics'
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
            profilePicture: 'https://via.placeholder.com/50'
        },
        ...req.body
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

module.exports = router;