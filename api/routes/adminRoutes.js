const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateAdmin, authorizeAdmin } = require('../middlewares/authMiddleware');

// Protect the routes with authentication and authorization middleware
// router.use(authenticateAdmin);

// Admin dashboard home page
router.get('/', adminController.dashboardHome);

// Login admin
router.post('/login', adminController.loginAdmin);

// Manage users
router.get('/users', authorizeAdmin, adminController.manageUsers);

// Manage orders
router.get('/orders', authorizeAdmin, adminController.manageOrders);

// Other admin-specific routes
// ...

module.exports = router;
