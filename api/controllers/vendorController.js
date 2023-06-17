const multer = require('multer');
const Product = require('../models/Product');
const Vendor = require('../models/Vendor');
const upload = require('../helpers/handleImageUpload');
// ...

const dashboardHome = async (req, res) => {
    try {
        // Fetch the vendor's products from the database
        const products = await Product.find({ vendor: req.vendor._id });

        // Return the products as the API response
        res.json({ products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const uploadImage = async (req, res, next) => {
    try {
        upload.single('image')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                // Handle multer errors
                return next(err);
            } else if (err) {
                // Handle other errors
                return next(err);
            }

            // File uploaded successfully
            const { filename } = req.file;

            // Store the image path in the vendor record
            // req.vendor.image = filename;
            // await req.vendor.save();

            res.json({ message: 'Image uploaded successfully' });
        });
    } catch (error) {
        next(error);
    }
}

const addProduct = async (req, res) => {
    try {
        // Get the product details from the request body
        const { name, price, description } = req.body;

        // Create a new product
        const newProduct = new Product({
            name,
            price,
            description,
            vendor: req.vendor._id,
        });

        // Save the new product to the database
        const savedProduct = await newProduct.save();

        // Return the saved product as the API response
        res.json({ product: savedProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const editProduct = async (req, res) => {
    try {
        // Get the product ID from the request parameters
        const productId = req.params.productId;

        // Fetch the product from the database
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Check if the logged-in vendor is the owner of the product
        if (product.vendor.toString() !== req.vendor._id.toString()) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Update the product details
        product.name = req.body.name;
        product.price = req.body.price;
        product.description = req.body.description;

        // Save the updated product to the database
        const updatedProduct = await product.save();

        // Return the updated product as the API response
        res.json({ product: updatedProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteProduct = async (req, res) => {
    try {
        // Get the product ID from the request parameters
        const productId = req.params.productId;

        // Fetch the product from the database
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Check if the logged-in vendor is the owner of the product
        if (product.vendor.toString() !== req.vendor._id.toString()) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Delete the product from the database
        await product.remove();

        // Return a success message as the API response
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
// Other vendor-specific controller methods
// ...


module.exports = { dashboardHome, uploadImage, addProduct, editProduct, deleteProduct };
