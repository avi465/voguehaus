const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const { authenticateVendor, authorizeVendor } = require('../middlewares/authMiddleware');

// Protect the routes with authentication and authorization middleware
router.use(authenticateVendor);

// Vendor dashboard home page
router.get('/', vendorController.dashboardHome);

// Add a new product
router.post('/products', authorizeVendor, vendorController.addProduct);

// Upload a product image
router.post('/upload/image', authorizeVendor, vendorController.uploadImage);

// Edit an existing product
router.put('/products/:productId', authorizeVendor, vendorController.editProduct);

// Delete a product
router.delete('/products/:productId', authorizeVendor, vendorController.deleteProduct);

// Other vendor-specific routes
// ...

module.exports = router;
