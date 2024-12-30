const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
// Create a new product
const createProduct = async (req, res) => {
    const {
        name,
        description,
        stock,
        price,
        category,
        visibility,
        visibilityDate,
        discount,
    } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const processedVisibilityDate = visibilityDate === 'null' ? null : visibilityDate;

    const categoryDoc = await Category.findOne({name: category});

    if (!categoryDoc) {
        return res.status(404).json({message: 'Category not found'});
    }

    try {
        const product = new Product({
            name,
            description,
            stock,
            price,
            category: categoryDoc._id,
            image,
            visibility,
            visibilityDate: processedVisibilityDate,
            discount,
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Get a single product
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Update a product
const updateProduct = async (req, res) => {
    const updates = req.body;

    try {
        const product = await Product.findByIdAndUpdate(req.params.id, updates, {
            new: true,
        });
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json({message: 'Product deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
