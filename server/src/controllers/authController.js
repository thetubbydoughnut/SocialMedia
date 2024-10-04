const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Add this line at the top of the file
const JWT_SECRET = '97ada07a19c416c5114359a4db277e0542147790238a621e923c6d409075c080f792a20568a1e42e38d6e12802873f24e825f2e4a87d997c3f06a42e02f9db56';

exports.register = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;
    
    // Check if user with this email already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    const user = await User.create({ username, email, password, firstName, lastName });
    // Use JWT_SECRET here
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ 
      user: { 
        id: user.id, 
        username: user.username, 
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }, 
      token 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (!(await User.validatePassword(user, password))) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    
    // Use JWT_SECRET here
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
    
    // Update last login
    await User.update(user.id, { lastLogin: new Date() });

    res.json({ 
      user: { 
        id: user.id, 
        username: user.username, 
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }, 
      token 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio,
      profilePicture: user.profilePicture
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, bio } = req.body;
    const updatedUser = await User.update(req.user.id, { firstName, lastName, bio });
    res.json({
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      bio: updatedUser.bio,
      profilePicture: updatedUser.profilePicture
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!user || !(await User.validatePassword(user, currentPassword))) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    await User.update(req.user.id, { password: newPassword });
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ... other controller methods