import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import Factory from '../utils/FactoryHandler';
import Product from '../models/product.model';
import SubCategory from '../models/subCategory.model';

// @desc    Set Brand ID for Nested Routes
// @route   POST /api/v1/brands/:brandId/products/
// @access  Private
export const setBrandId = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.brand_id) req.body.brand_id = req.params.brandId;
  next();
};

// @desc    Set Category ID for Nested Routes
// @route   POST /api/v1/categories/:categoryId/products/
// @access  Private
export const setCategoryId = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.category_id) req.body.category_id = req.params.categoryId;
  next();
};

// @desc    Set Subategory ID for Nested Routes
// @route   POST /api/v1/subcategories/:subcategoryId/products/
// @access  Private
export const setSubcategoryId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const subcategory = await SubCategory.findById(req.params.subcategoryId);

  if (!req.body.category_id) req.body.category_id = subcategory?.category_id;
  if (!req.body.subcategories_ids) req.body.subcategories_ids = req.params.subcategoryId;
  next();
});

// @desc    Get list of products
// @route   GET /api/v1/products
// @route   GET /api/v1/brands/:brandId/products
// @route   GET /api/v1/categories/:categoryId/products
// @route   GET /api/v1/brands/:brandId/products
// @access  Public
export const getProducts = Factory.getAll(Product, {
  filters: [
    { reqBodyField: 'brand_id', reqParamField: 'brandId' },
    { reqBodyField: 'category_id', reqParamField: 'categoryId' },
    { reqBodyField: 'subcategories_ids', reqParamField: 'subcategoryId' },
  ],
});

// @desc    Get specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
export const getProduct = Factory.getOne(Product);

// @desc    Create product
// @route   POST  /api/v1/products
// @access  Private
export const createProduct = Factory.createOne(Product);

// @desc    Update specific product
// @route   PATCH /api/v1/products/:id
// @access  Private
export const updateProduct = Factory.updateOne(Product);

// @desc    Delete specific product
// @route   DELETE /api/v1/products/:id
// @access  Private
export const deleteProduct = Factory.deleteOne(Product);
