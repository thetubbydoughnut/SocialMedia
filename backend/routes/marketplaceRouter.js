const express = require('express');
const multer = require('multer');
const db = require('../config/knexinit'); // Ensure this path is correct
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.get('/posts', async (req, res) => {
    try {
        const { category } = req.query;
        const query = db('marketplace_posts');
        if (category && category !== 'All') {
            query.where('category', category);
        }
        const posts = await query;
        res.json(posts);
    } catch (error) {
        console.error('Error fetching marketplace posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/posts', upload.single('image'), async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;
        const newPost = {
            name,
            price,
            description,
            category,
            image,
            user_name: 'Current User', // Replace with actual user data
            user_profile_picture: 'https://via.placeholder.com/50' // Replace with actual user data
        };
        const [id] = await db('marketplace_posts').insert(newPost);
        newPost.id = id;
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating marketplace post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;