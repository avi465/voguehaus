const User = require('../models/User');
const Vendor = require('../models/Vendor');
const Admin = require('../models/Admin');

const authenticateVendor = async (req, res, next) => {
    try {
        if (!req.session.vendorId) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        const vendor = await Vendor.findById(req.session.vendorId);

        if (!vendor) {
            return res.status(401).json({ error: 'Invalid session' });
        }

        req.vendor = vendor;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const authenticateAdmin = async (req, res, next) => {
    try {
        if (!req.session.adminId) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        const admin = await Admin.findById(req.session.adminId);

        if (!admin) {
            return res.status(401).json({ error: 'Invalid session' });
        }

        req.admin = admin;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const authorizeVendor = async (req, res, next) => {
    try {
        const { vendor, params } = req;
        const product = await Product.findById(params.productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Check if the logged-in vendor is the owner of the product
        if (product.vendor.toString() !== vendor._id.toString()) {
            return res.status(403).json({ error: 'Access denied' });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const authorizeAdmin = (req, res, next) => {
    try {
        // Implement your authorization logic for admin here
        // ...

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { authenticateVendor, authenticateAdmin, authorizeVendor, authorizeAdmin };
