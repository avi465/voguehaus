const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    token: String,
    createdAt: { type: Date, default: Date.now },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
