const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const router = express.Router();

// Add this check at the top of the file
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not set. Please check your .env file.');
  process.exit(1);
}

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await req.db('users').where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [userId] = await req.db('users').insert({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),  // Add this line
      updatedAt: new Date()   // Add this line if you have an updatedAt field
    });

    const token = jwt.sign({ user: { id: userId } }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: userId, username, email } });  // Include user data in the response
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await req.db('users').where({ email }).first();
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/user', auth, async (req, res) => {
  try {
    const user = await req.db('users').where({ id: req.user.id }).first().select('id', 'username', 'email');
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;