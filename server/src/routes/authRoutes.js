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

module.exports = router;