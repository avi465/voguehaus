require('dotenv').config();
const bcrypt = require('bcryptjs');

const register = async (name, email, phone, password) => {
    try {
        // Check if the email already exists
        if (email) {
            const isEmailExist = await User.findOne({ email });
            if (isEmailExist) {
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

        res.json({ message: 'User registered successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const phoneAuth = (phone, otpCode) => {
    // Read more at http://twil.io/secure
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const verifySid = process.env.TWILIO_VERIFY_SID;
    const client = require("twilio")(accountSid, authToken);

    client.verify.v2
        .services(verifySid)
        .verifications.create({ to: phone, channel: "sms" })
        .then((verification) => console.log(verification.status))
        .then(() => {
            client.verify.v2
                .services(verifySid)
                .verificationChecks.create({ to: phone, code: otpCode })
                .then((verification_check) => console.log(verification_check.status))
        });
}
