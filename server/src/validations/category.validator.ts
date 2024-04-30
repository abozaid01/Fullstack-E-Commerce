import { check, body } from 'express-validator';
import validatorMiddleware from '../middlewares/validation.middleware';
import Category from '../models/category.model';

const checkNameExist = async (name: string) => {
  return Category.findOne({ name }).then((category) => {
    if (category) {
      return Promise.reject(new Error(`category ${name} alerady exist`));
    }
  });
};

export const getCategoryValidator = [check('id').isMongoId().withMessage('Invalid category id format'), validatorMiddleware];

export const createCategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage(`Category's name is required`)
    .isString()
    .withMessage(`Category's name Must be String`)
    .isLength({ min: 3 })
    .withMessage('Too short category name')
    .isLength({ max: 32 })
    .withMessage('Too long category name')
    .custom(checkNameExist),

  validatorMiddleware,
];

export const updateCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  body('name')
    .optional()
    .isString()
    .withMessage("'name' must be string")
    .isLength({ min: 3 })
    .withMessage('Too short Category name')
    .isLength({ max: 32 })
    .withMessage('Too long Category name')
    .custom(checkNameExist),

  validatorMiddleware,
];

export const deleteCategoryValidator = [check('id').isMongoId().withMessage('Invalid category id format'), validatorMiddleware];
