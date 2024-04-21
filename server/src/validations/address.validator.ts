import { body, param } from 'express-validator';
import validatorMiddleware from '../middlewares/validation.middleware';

export const addAddressValidator = [
  body('alias').optional().isString().withMessage('alias must be a string'),
  body('details').notEmpty().withMessage('address details is required').isString().withMessage('details must be a string'),
  body('phone').optional().isString().withMessage('phone must be a string'),
  body('city').optional().isString().withMessage('city must be a string'),
  body('postalCode').optional().isString().withMessage('postalCode must be a string'),
  validatorMiddleware,
];

export const removeAddressValidator = [
  param('addressId').isMongoId().withMessage('Invalid addressId format'),
  body('alias').optional().isString().withMessage('alias must be a string'),
  body('details').optional().isString().withMessage('details must be a string'),
  body('phone').optional().isString().withMessage('phone must be a string'),
  body('city').optional().isString().withMessage('city must be a string'),
  body('postalCode').optional().isString().withMessage('postalCode must be a string'),
  validatorMiddleware,
];
