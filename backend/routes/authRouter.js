const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const router = express.Router();

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user || !(await user.comparePassword(password))) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        next(error);
    }
});

router.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        const error = new Error('Username and password are required');
        error.statusCode = 400;
        return next(error);
    }
    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            const error = new Error('Username already exists');
            error.statusCode = 400;
            throw error;
        }

        const user = await User.create({ username, password });
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        next(error);
    }
});

module.exports = router;