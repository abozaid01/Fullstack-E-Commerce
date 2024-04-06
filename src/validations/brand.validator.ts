import { check, body } from 'express-validator';
import validatorMiddleware from '../middlewares/validation.middleware';

export const getBrandValidator = [check('id').isMongoId().withMessage('Invalid brand id format'), validatorMiddleware];

export const createBrandValidator = [
  check('name')
    .notEmpty()
    .withMessage('Brand name is required')
    .isString()
    .withMessage("'name' must be string")
    .isLength({ min: 3 })
    .withMessage('Too short brand name')
    .isLength({ max: 32 })
    .withMessage('Too long brand name'),

  validatorMiddleware,
];

export const updateBrandValidator = [
  check('id').isMongoId().withMessage('Invalid brand id format'),
  body('name')
    .optional()
    .isString()
    .withMessage("'name' must be string")
    .isLength({ min: 3 })
    .withMessage('Too short brand name')
    .isLength({ max: 32 })
    .withMessage('Too long brand name'),

  validatorMiddleware,
];

export const deleteBrandValidator = [check('id').isMongoId().withMessage('Invalid brand id format'), validatorMiddleware];
