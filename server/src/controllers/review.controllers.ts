import { Request, Response, NextFunction } from 'express';
import Factory from '../utils/FactoryHandler';
import Review from '../models/review.model';

// @desc    Set User ID for Authenticated users
// @route   POST /api/v1/reviews
// @route   POST /api/v1/products/:productId/reviews/
// @access  Private/User
export const setUserId = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.user_id) req.body.user_id = req.user?.id;
  next();
};

// @desc    Set Product ID for Nested Routes
// @route   POST /api/v1/products/:productId/reviews/:id
// @access  Private/User
export const setProductId = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.product_id) req.body.product_id = req.params.productId;
  next();
};

// @desc    Get list of all reviews
// @route   GET /api/v1/reviews
// @route   GET /api/v1/products/:productId/reviews
// @access  Public
export const getReviews = Factory.getAll(Review, { filters: [{ reqBodyField: 'product_id', reqParamField: 'productId' }] });

// @desc    Get specific review by id
// @route   GET /api/v1/reviews/:id
// @access  Public
export const getReview = Factory.getOne(Review);

// @desc    Create review
// @route   POST  /api/v1/reviews
// @access  Private/Protect/User
export const createReview = Factory.createOne(Review);

// @desc    Update specific review
// @route   PATCH /api/v1/reviews/:id
// @access  Private/User
export const updateReview = Factory.updateOne(Review);

// @desc    Delete specific review
// @route   DELETE /api/v1/reviews/:id
// @access  Private/User/Admin
export const deleteReview = Factory.deleteOne(Review);
