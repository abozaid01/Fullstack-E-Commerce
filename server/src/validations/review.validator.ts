import { check, body, CustomValidator, param } from 'express-validator';
import validatorMiddleware from '../middlewares/validation.middleware';
import Product from '../models/product.model';
import User from '../models/user.models';
import Review from '../models/review.model';
import Logger from '../utils/Logger';

// Custom validator function to check if the product_id exists in the DB
const checkProductExists: CustomValidator = async (value) => {
  if (!value) {
    throw new Error('review must belong to a product');
  }

  const review = await Product.findById(value);
  if (!review) {
    throw new Error('Invalid product ID. product does not exist.');
  }
};

// Custom validator function to check if the user_id exists in the DB
async function checkUserExist(userId: string) {
  return User.findById(userId).then((user) => {
    if (!user) {
      return Promise.reject(new Error(`No user found with this id: ${userId}`));
    }
  });
}

// Custom validator function to check if the review exists in the DB
async function checkReviewExist(reviewId: string) {
  return Review.findById(reviewId).then((review) => {
    if (!review) {
      return Promise.reject(new Error(`No review found with this id: ${reviewId}`));
    }
  });
}

export const getAllReviewsValidator = [
  param('productId').optional().isMongoId().withMessage('Invalid product id format').custom(checkProductExists),
  validatorMiddleware,
];

export const getReviewValidator = [check('id').isMongoId().withMessage('Invalid Review id format'), validatorMiddleware];

export const createReviewValidator = [
  body('review')
    .optional()
    .isString()
    .withMessage(`'review' must be string`)
    .isLength({ min: 2 })
    .withMessage('Too short review')
    .isLength({ max: 500 })
    .withMessage('Too long review'),

  body('rating')
    .notEmpty()
    .withMessage('review rating is required')
    .isFloat({ min: 0, max: 5 })
    .withMessage('Ratings value must be between 1 to 5'),

  body('user_id')
    .notEmpty()
    .withMessage('review must be belong to a user')
    .isMongoId()
    .withMessage('invalid user id format')
    .custom(checkUserExist),

  body('product_id')
    .notEmpty()
    .withMessage('review must be belong to product')
    .isMongoId()
    .withMessage('Invalid product id format')
    // check if product exists
    .custom(checkProductExists)
    // Check if logged user create review before
    .custom(async (_val, { req }) =>
      Review.findOne({ user_id: req.user.id, product_id: req.body.product_id }).then((review) => {
        if (review) {
          return Promise.reject(new Error('You already created a review before'));
        }
      }),
    )
    // Check review ownership before create
    .custom(async (_val, { req }) => {
      if (req.user.id !== req.body.user_id) {
        Logger.error(`unauthorized user: ${req.user.id} with ip: ${req.ip} trying to create review`);
        return Promise.reject(new Error(`You are not allowed to perform this action`));
      }
    }),

  validatorMiddleware,
];

export const updateReviewValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid Review id format')
    .custom(checkReviewExist)
    // check the review ownership
    .custom(async (val, { req }) => {
      return Review.findOne({ $and: [{ user_id: req.user.id }, { _id: val }] }).then((review) => {
        if (!review) {
          Logger.error(`unauthorized user: ${req.user.id} with ip: ${req.ip} trying to updadte review: ${val}`);
          return Promise.reject(new Error(`You are not allowed to perform this action`));
        }
      });
    }),

  body('review')
    .optional()
    .isString()
    .withMessage(`'review' must be string`)
    .isLength({ min: 2 })
    .withMessage('Too short review')
    .isLength({ max: 500 })
    .withMessage('Too long review'),

  body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Ratings value must be between 1 to 5'),

  // prevent updating review ownership or the product
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  body('product_id').customSanitizer((_value, { req }) => undefined),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  body('user_id').customSanitizer((_value, { req }) => undefined),

  validatorMiddleware,
];

export const deleteReviewValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid Review id format')
    .custom(checkReviewExist)
    // check the review ownership
    .custom(async (val, { req }) => {
      return Review.findOne({ $and: [{ user_id: req.user.id }, { _id: val }] }).then((review) => {
        if (!review) {
          Logger.error(`unauthorized user: ${req.user.id} with ip: ${req.ip} trying to delete review: ${val}`);
          return Promise.reject(new Error(`You are not allowed to perform this action`));
        }
      });
    }),

  validatorMiddleware,
];
