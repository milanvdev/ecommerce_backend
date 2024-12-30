// controllers/categoryController.js
const Category = require('../models/categoryModel');

// Create a new category
const createCategory = async (req, res) => {
    const {name} = req.body;

    try {
        const category = new Category({name});
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Get a single category
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({message: 'Category not found'});
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Update a category
const updateCategory = async (req, res) => {
    const updates = req.body;

    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            updates,
            {new: true}
        );
        if (!category) {
            return res.status(404).json({message: 'Category not found'});
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({message: 'Category not found'});
        }
        res.status(200).json({message: 'Category deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
