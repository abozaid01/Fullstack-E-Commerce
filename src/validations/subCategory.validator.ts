import { check, body, CustomValidator, param } from 'express-validator';
import validatorMiddleware from '../middlewares/validation.middleware';
import Category from '../models/category.model';

// Custom validator function to check if the category_id exists in the Category collection
const categoryExistsValidator: CustomValidator = async (value) => {
  if (!value) {
    throw new Error('Subcategory must belong to a category');
  }

  const category = await Category.findById(value);
  if (!category) {
    throw new Error('Invalid Category ID. Category does not exist.');
  }
};

export const getAllSubcategoriesValidator = [
  param('categoryId').optional().isMongoId().withMessage('Invalid Category id format').custom(categoryExistsValidator),
  validatorMiddleware,
];

export const getSubCategoryValidator = [check('id').isMongoId().withMessage('Invalid Subcategory id format'), validatorMiddleware];

export const createSubCategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage('SubCategory required')
    .isString()
    .withMessage("'name' must be string")
    .isLength({ min: 2 })
    .withMessage('Too short Subcategory name')
    .isLength({ max: 32 })
    .withMessage('Too long Subcategory name'),

  check('category_id')
    .notEmpty()
    .withMessage('subCategory must be belong to category')
    .isMongoId()
    .withMessage('Invalid Category id format')
    .custom(categoryExistsValidator), // Using custom validator to check if category exists

  validatorMiddleware,
];

export const updateSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid Subcategory id format'),

  body('name')
    .optional()
    .isString()
    .withMessage("'name' must be string")
    .isLength({ min: 2 })
    .withMessage('Too short Subcategory name')
    .isLength({ max: 32 })
    .withMessage('Too long Subcategory name'),

  check('category_id').optional().isMongoId().withMessage('Invalid Category id format').custom(categoryExistsValidator), // Using custom validator to check if category exists

  validatorMiddleware,
];

export const deleteSubCategoryValidator = [check('id').isMongoId().withMessage('Invalid SubCategory id format'), validatorMiddleware];
