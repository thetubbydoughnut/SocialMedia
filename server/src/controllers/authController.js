const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendEmail } = require('../services/emailService');

// Use process.env.JWT_SECRET instead
exports.register = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;
    
    // Check if user with this email already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    const user = await User.create({ username, email, password, firstName, lastName });
    const verificationToken = await User.setEmailVerificationToken(user.id);
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;
    await sendEmail(
      email,
      'Verify Your Email',
      `Please click this link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a>`
    );
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ 
      user: { 
        id: user.id, 
        username: user.username, 
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isEmailVerified: false,
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
    console.log('Login attempt for email:', email); // Add this line

    const user = await User.findByEmail(email);
    if (!user) {
      console.log('User not found for email:', email); // Add this line
      return res.status(400).json({ message: 'User not found' });
    }

    const isValidPassword = await User.validatePassword(user, password);
    if (!isValidPassword) {
      console.log('Invalid password for email:', email); // Add this line
      return res.status(400).json({ message: 'Invalid password' });
    }
    
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    // Update last login
    await User.update(user.id, { lastLogin: new Date() });

    console.log('Login successful for email:', email); // Add this line

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
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

exports.getProfile = (req, res) => {
  try {
    const userId = req.user.id; // Ensure req.user is defined
    // Fetch user profile from database using userId
    // ...
  } catch (error) {
    console.error('Error in getProfile:', error);
    res.status(500).json({ message: 'Server Error' });
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
    await User.changePassword(req.user.id, newPassword);
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ... other controller methods

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findByEmail(email);
    if (!user) {
      // Don't reveal that the user doesn't exist
      return res.json({ message: 'If an account with that email exists, we sent a password reset link.' });
    }
    const resetToken = await User.createResetToken(email);
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    
    // Send email
    await sendEmail(
      email,
      'Password Reset Request',
      `You requested a password reset. Please click on the following link to reset your password: ${resetUrl}`
    );

    res.json({ message: 'If an account with that email exists, we sent a password reset link.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Error processing your request' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    await User.resetPassword(token, newPassword);
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    await User.verifyEmail(token);
    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};