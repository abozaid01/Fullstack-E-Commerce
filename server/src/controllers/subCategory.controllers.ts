import { Request, Response, NextFunction } from 'express';
import Factory from '../utils/FactoryHandler';
import SubCategory from '../models/subCategory.model';

// Allow Nested Routes
// POST /api/v1/categories/:categoryId/subcategories/:id
export const setSubCategoryId = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.category_id) req.body.category_id = req.params.categoryId;
  next();
};

// @desc    Get list of All SubCategories
// @route   GET /api/v1/subCategories
// @route   GET /api/v1/categories/:categoryId/subcategories
// @access  Public
export const getSubCategories = Factory.getAll(SubCategory, { filters: [{ reqBodyField: 'category_id', reqParamField: 'categoryId' }] });

// @desc    Get specific SubCategory by id
// @route   GET /api/v1/subCategories/:id
// @access  Public
export const getSubCategory = Factory.getOne(SubCategory);

// @desc    Create SubCategory
// @route   POST  /api/v1/subCategories
// @access  Private/Admin
export const createSubCategory = Factory.createOne(SubCategory);

// @desc    Update specific SubCategory
// @route   PUT /api/v1/subCategories/:id
// @access  Private/Admin
export const updateSubCategory = Factory.updateOne(SubCategory);

// @desc    Delete specific SubCategory
// @route   DELETE /api/v1/subCategories/:id
// @access  Private/Admin
export const deleteSubCategory = Factory.deleteOne(SubCategory);
