const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateUser } = require('../middlewares/authMiddleware');


// User registration
router.post('/register', authController.register);

// User login
router.post('/login', authController.login);

// User logout
router.post('/logout', authenticateUser, authController.logout);

// Reset password
// router.post('/reset-password', authController.resetPassword);

module.exports = router;
