import Factory from '../utils/FactoryHandler';
import Category from '../models/category.model';

// @desc    Get list of All Categories
// @route   GET /api/v1/Categories
// @access  Public
export const getCategories = Factory.getAll(Category);

// @desc    Get specific Category by id
// @route   GET /api/v1/Categories/:id
// @access  Public
export const getCategory = Factory.getOne(Category);

// @desc    Create Category
// @route   POST  /api/v1/Categories
// @access  Private/Admin
export const createCategory = Factory.createOne(Category);

// @desc    Update specific Category
// @route   PUT /api/v1/Categories/:id
// @access  Private/Admin
export const updateCategory = Factory.updateOne(Category);

// @desc    Delete specific Category
// @route   DELETE /api/v1/Categories/:id
// @access  Private/Admin
export const deleteCategory = Factory.deleteOne(Category);
