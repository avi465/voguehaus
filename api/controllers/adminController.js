const bcrypt = require('bcrypt');
const User = require('../models/User');
const Admin = require('../models/Admin');
const Vendor = require('../models/Vendor');
const Order = require('../models/Order');
// ...

const loginAdmin = async (req, res) => {
    const { email, password, rememberMe } = req.body;

    try {
        // Find the user by email
        const user = await Admin.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Validate the password
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Log in the user

        // Set the user ID in the session
        req.session.userId = user._id;

        // Set the session expiration if rememberMe is true
        if (rememberMe) {
            req.session.cookie.expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
        }

        // Send a success response
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const dashboardHome = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        // Fetch all orders from the database
        const orders = await Order.find();

        // Return the users and orders as the API response
        res.json({ users, orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const manageUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        // Return the users as the API response
        res.json({ users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const manageOrders = async (req, res) => {
    try {
        // Fetch all orders from the database
        const orders = await Order.find();

        // Return the orders as the API response
        res.json({ orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Other admin-specific controller methods
// ...

module.exports = { loginAdmin, dashboardHome, manageUsers, manageOrders };
