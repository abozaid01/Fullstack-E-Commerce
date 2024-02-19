import Factory from '../utils/FactoryHandler';
import Product from '../models/product.models';

// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Public
export const getProducts = Factory.getAll(Product);

// @desc    Get specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
export const getProduct = Factory.getOne(Product);

// @desc    Create product
// @route   POST  /api/v1/products
// @access  Private
export const createProduct = Factory.createOne(Product);

// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
export const updateProduct = Factory.updateOne(Product);

// @desc    Delete specific product
// @route   DELETE /api/v1/products/:id
// @access  Private
export const deleteProduct = Factory.deleteOne(Product);
