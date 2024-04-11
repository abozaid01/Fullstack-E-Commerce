import Factory from '../utils/FactoryHandler';
import Coupon from '../models/coupon.model';

// @desc    Get list of All Coupons
// @route   GET /api/v1/Coupons
// @access  Private/Admin
export const getCoupons = Factory.getAll(Coupon);

// @desc    Get specific Coupon by id
// @route   GET /api/v1/Coupons/:id
// @access  Private/Admin
export const getCoupon = Factory.getOne(Coupon);

// @desc    Create Coupon
// @route   POST  /api/v1/Coupons
// @access  Private/Admin
export const createCoupon = Factory.createOne(Coupon);

// @desc    Update specific Coupon
// @route   PUT /api/v1/Coupons/:id
// @access  Private/Admin
export const updateCoupon = Factory.updateOne(Coupon);

// @desc    Delete specific Coupon
// @route   DELETE /api/v1/Coupons/:id
// @access  Private/Admin
export const deleteCoupon = Factory.deleteOne(Coupon);
