const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Make sure getProfile is defined in authController
router.get('/profile', authMiddleware, authController.getProfile);

// These routes should also have corresponding controller methods
router.put('/profile', authMiddleware, authController.updateProfile);
router.put('/change-password', authMiddleware, authController.changePassword);

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.get('/verify-email/:token', authController.verifyEmail);

module.exports = router;