const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateAdmin, authorizeAdmin } = require('../middlewares/authMiddleware');

// Admin dashboard home page
router.get('/', authenticateAdmin, adminController.dashboardHome);

// Admin login
router.post('/login', adminController.adminLogin);

// Admin logout
router.post('/logout', authenticateAdmin, adminController.adminLogout);

// Manage vendors
router.get('/vendors', authenticateAdmin, adminController.manageVendors);

// Manage categories
router.get('/categories', authenticateAdmin, adminController.manageCategories);

// Manage brands
router.get('/brands', authenticateAdmin, adminController.manageBrands);

// Manage coupons
router.get('/coupons', authenticateAdmin, adminController.manageCoupons);

// Manage orders
router.get('/orders', authenticateAdmin, adminController.manageOrders);

module.exports = router;
