import { body, param } from 'express-validator';
import validatorMiddleware from '../middlewares/validation.middleware';
import Coupon from '../models/coupon.model';

const checkNameExist = async (name: string) => {
  return Coupon.findOne({ name }).then((coupon) => {
    if (coupon) {
      return Promise.reject(new Error(`coupon ${name} alerady exist`));
    }
  });
};

export const getCouponValidator = [param('id').isMongoId().withMessage('Invalid Coupon id format'), validatorMiddleware];

export const createCouponValidator = [
  body('name')
    .notEmpty()
    .withMessage('Coupon name is required')
    .isString()
    .withMessage("'name' must be string")
    .isLength({ min: 3 })
    .withMessage('Too short Coupon name')
    .isLength({ max: 32 })
    .withMessage('Too long Coupon name')
    .custom(checkNameExist),

  body('expire').notEmpty().withMessage('Coupon expire time is required').isDate().withMessage("'expire' field must be in a date format"),

  body('discount')
    .notEmpty()
    .withMessage('Coupon discount value is required')
    .isFloat({ min: 1, max: 100 })
    .withMessage("'discount' must be in a number between 1% to 100%"),

  validatorMiddleware,
];

export const updateCouponValidator = [
  param('id').isMongoId().withMessage('Invalid Coupon id format'),

  body('name')
    .optional()
    .isString()
    .withMessage("'name' must be string")
    .isLength({ min: 3 })
    .withMessage('Too short Coupon name')
    .isLength({ max: 32 })
    .withMessage('Too long Coupon name')
    .custom(checkNameExist),

  body('expire').optional().isDate().withMessage("'expire' must be in a date format"),

  body('discount').optional().isFloat({ min: 1, max: 100 }).withMessage("'discount' must be in a number between 1% to 100%"),

  validatorMiddleware,
];

export const deleteCouponValidator = [param('id').isMongoId().withMessage('Invalid Coupon id format'), validatorMiddleware];
