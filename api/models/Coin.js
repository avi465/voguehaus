const rewardCoinSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    coins: {
        type: Number,
        required: true,
        default: 0,
    },
    transactions: [
        {
            amount: {
                type: Number,
                required: true,
            },
            vendor: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Vendor',
                required: true,
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});

const RewardCoin = mongoose.model('RewardCoin', rewardCoinSchema);
