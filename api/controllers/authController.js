require('dotenv').config();
const bcrypt = require('bcrypt');
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const { store } = require('../middlewares/sessionMiddleware');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Check if the email already exists
        if (email) {
            const existingEmailUser = await User.findOne({ email });
            if (existingEmailUser) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            // Check if the password is provided
            if (!password) {
                return res.status(400).json({ error: 'Password is required' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
            });
            await newUser.save();
        }

        // Check if the phone number already exists
        if (phone) {
            const existingPhoneUser = await User.findOne({ phone });
            if (existingPhoneUser) {
                return res.status(400).json({ error: 'Phone number already exists' });
            }
            // Use Twilio Verify to send a verification code to the user's phone number
            twilio.verify.v2.services(process.env.TWILIO_VERIFY_SID)
                .verifications
                .create({ to: phone, channel: 'sms' })
                .then(verification => console.log(verification.status));

            // Create a new user
            const newUser = new User({
                name,
                phone,
            });
            await newUser.save();
        }

        res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password, rememberMe } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ error: 'Invalid email' });
        }

        // Validate the password
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Log in the user

        // Set the user ID in the session
        req.session.userId = user._id;

        // Set the session expiration if rememberMe is true
        if (rememberMe) {
            req.session.cookie.expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
        }

        // Respond with a success message
        res.status(200).json({ message: 'Login successful' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// User logout
exports.logout = async (req, res) => {
    try {
        // Clear the session data
        req.session.destroy();
        // Remove the session from the session store
        store.destroy(req.sessionID, (error) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: 'Error while destroying session' });
            }

            // Clear the session cookie
            res.clearCookie('sessionId');

            // Respond with a success message or redirect to the desired page
            res.status(200).json({ message: 'Logout successful' });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Check session
exports.checkSession = async (req, res) => {
    // User session is valid
    res.sendStatus(200);
}