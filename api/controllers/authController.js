require('dotenv').config();
const bcrypt = require('bcrypt');
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const User = require('../models/User');
const Session = require('../models/Session');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Check if the email or phone number already exists
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Email or phone number already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Use Twilio Verify to send a verification code to the user's phone number
        twilio.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
            .verifications
            .create({ to: phone, channel: 'sms' })
            .then(verification => console.log(verification.status));

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone
        });
        await newUser.save();

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


// const bcrypt = require('bcrypt');
// const User = require('../models/User');
// const Session = require('../models/Session');
// const { roles } = require('../constants');
// const { sendOTP, verifyOTP } = require('../helpers/twilioHelper');
// // const twilio = require('twilio');

// // const accountSid = 'your_account_sid';
// // const authToken = 'your_auth_token';
// // const client = twilio(accountSid, authToken);

// // Register user with phone number and send OTP
// async function registerWithPhone(req, res, next) {
//     try {
//         const { phoneNumber } = req.body;

//         // Generate OTP
//         const otp = Math.floor(100000 + Math.random() * 900000);

//         // Send OTP to user's phone number
//         await sendOTP(phoneNumber, otp);

//         // Save OTP and phone number in session
//         req.session.otp = otp;
//         req.session.phoneNumber = phoneNumber;

//         res.json({ message: 'OTP sent successfully' });
//     } catch (error) {
//         next(error);
//     }
// }

// // Verify OTP and create user account
// async function verifyOTPAndCreateAccount(req, res, next) {
//     try {
//         const { otp, name, role } = req.body;
//         const { otp: savedOTP, phoneNumber } = req.session;

//         if (!savedOTP || !phoneNumber) {
//             throw new Error('OTP verification failed');
//         }

//         // Verify OTP
//         const isOTPVerified = await verifyOTP(phoneNumber, otp);

//         if (!isOTPVerified) {
//             throw new Error('Invalid OTP');
//         }

//         // Check if user already exists
//         const existingUser = await User.findOne({ phoneNumber });
//         if (existingUser) {
//             throw new Error('User already exists');
//         }

//         // Create user account
//         const hashedPassword = await bcrypt.hash(otp.toString(), 10);
//         const user = new User({ phoneNumber, name, role, password: hashedPassword });
//         await user.save();

//         // Create a new session record
//         const session = new Session({ userId: user._id });
//         await session.save();

//         res.json({ message: 'User account created successfully' });
//     } catch (error) {
//         next(error);
//     }
// }

// // Login with phone number and send OTP
// async function loginWithPhone(req, res, next) {
//     try {
//         const { phoneNumber } = req.body;

//         // Generate OTP
//         const otp = Math.floor(100000 + Math.random() * 900000);

//         // Send OTP to user's phone number
//         await sendOTP(phoneNumber, otp);

//         // Save OTP and phone number in session
//         req.session.otp = otp;
//         req.session.phoneNumber = phoneNumber;

//         res.json({ message: 'OTP sent successfully' });
//     } catch (error) {
//         next(error);
//     }
// }

// // Verify OTP and generate access token
// async function verifyOTPAndGenerateToken(req, res, next) {
//     try {
//         const { otp } = req.body;
//         const { otp: savedOTP, phoneNumber } = req.session;

//         if (!savedOTP || !phoneNumber) {
//             throw new Error('OTP verification failed');
//         }

//         // Verify OTP
//         const isOTPVerified = await verifyOTP(phoneNumber, otp);

//         if (!isOTPVerified) {
//             throw new Error('Invalid OTP');
//         }

//         // Check if user exists
//         const user = await User.findOne({ phoneNumber });

//         if (!user) {
//             throw new Error('User not found');
//         }

//         // Create a new session record
//         const session = new Session({ userId: user._id });
//         await session.save();

//         res.json({ message: 'OTP verified successfully' });
//     } catch (error) {
//         next(error);
//     }
// }

// // Login with email and password
// async function loginWithEmail(req, res, next) {
//     try {
//         const { email, password } = req.body;

//         // Check if user exists
//         const user = await User.findOne({ email });

//         if (!user) {
//             throw new Error('Invalid email or password');
//         }

//         // Compare passwords
//         const isPasswordValid = await bcrypt.compare(password, user.password);

//         if (!isPasswordValid) {
//             throw new Error('Invalid email or password');
//         }

//         // Create a new session record
//         const session = new Session({ userId: user._id });
//         await session.save();

//         res.json({ message: 'Logged in successfully' });
//     } catch (error) {
//         next(error);
//     }
// }

// // Logout user
// async function logout(req, res, next) {
//     try {
//         const { sessionId } = req.session;

//         if (!sessionId) {
//             throw new Error('User not logged in');
//         }

//         // Clear session data
//         req.session.destroy();

//         res.json({ message: 'Logged out successfully' });
//     } catch (error) {
//         next(error);
//     }
// }

// module.exports = {
//     registerWithPhone,
//     verifyOTPAndCreateAccount,
//     loginWithPhone,
//     verifyOTPAndGenerateToken,
//     loginWithEmail,
//     logout,
// };
