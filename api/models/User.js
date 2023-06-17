const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: {
        line1: String,
        line2: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
    },
    phone: String,
    role: { type: String, enum: ['user', 'vendor', 'admin'], default: 'user' },
    cart: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number,
        },
    ],
    orders: [
        {
            order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
            status: String,
        },
    ],
    sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
