const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    stock: {
        type: Number,
        default: 0,
        min: 0,
    },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    attributes: {
        // attributes
        color: String,
        size: String,
        material: String,
        height: String,
        weight: String,
        dimensions: String,
    },
    images: [
        {
            url: String,
            altText: String,
        },
    ],
    reviews: [
        {
            review: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
            rating: Number,
        },
    ],
    ratings: {
        total: Number,
        count: Number,
        average: Number,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
