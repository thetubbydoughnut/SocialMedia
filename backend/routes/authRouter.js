const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Adjust the path as needed
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const knex = require('../config/database');

// User Registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists by email
        let user = await knex('users').where({ email }).first();
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Check if username is taken
        user = await knex('users').where({ username }).first();
        if (user) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Hash password before storing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with hashed password
        const [userId] = await knex('users').insert({
            username,
            email,
            password: hashedPassword
        });

        // Generate JWT token
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Fetch the created user
        const createdUser = await knex('users')
            .where({ id: userId })
            .first('id', 'username', 'email', 'bio', 'profilePhoto', 'coverPhoto');

        res.status(201).json({ token, user: createdUser });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// User Login
router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await knex('users')
            .where({ email })
            .first('id', 'username', 'email', 'password', 'bio', 'profilePhoto', 'coverPhoto');

        if (!user) {
            console.error('User not found');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error('Invalid password');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Exclude password from user data
        const { password: _, ...userData } = user;

        res.json({ token, user: userData });
    } catch (error) {
        console.error('Login error:', error);
        next(error);
    }
});

// Get Current User
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'username', 'bio', 'profilePhoto', 'coverPhoto'],
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;