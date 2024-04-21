import Factory from '../utils/FactoryHandler';
import Brand from '../models/brand.model';

// @desc    Get list of All Brands
// @route   GET /api/v1/Brands
// @access  Public
export const getBrands = Factory.getAll(Brand);

// @desc    Get specific Brand by id
// @route   GET /api/v1/Brands/:id
// @access  Public
export const getBrand = Factory.getOne(Brand);

// @desc    Create Brand
// @route   POST  /api/v1/Brands
// @access  Private/Admin
export const createBrand = Factory.createOne(Brand);

// @desc    Update specific Brand
// @route   PUT /api/v1/Brands/:id
// @access  Private/Admin
export const updateBrand = Factory.updateOne(Brand);

// @desc    Delete specific Brand
// @route   DELETE /api/v1/Brands/:id
// @access  Private/Admin
export const deleteBrand = Factory.deleteOne(Brand);
