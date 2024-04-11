import User from '../models/user.models';
import AppError from '../utils/AppError';
import { catchAsync } from '../utils/catchAsync';

// @desc    Add product to wishlist
// @route   POST /api/v1/wishlists
// @access  Protected/User
export const addProductToWishlist = catchAsync(async (req, res, next) => {
  // $addToSet => add productId to wishlist array if productId not exist
  const user = await User.findByIdAndUpdate(
    req.user?.id,
    {
      $addToSet: { wishlist: req.body.productId },
    },
    { new: true },
  );

  if (!user) {
    return next(new AppError(`There is no wishlist for this user id : ${req?.user?.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Product added successfully to your wishlist.',
    data: user.wishlist,
  });
});

// @desc    Remove product from wishlist
// @route   DELETE /api/v1/wishlists/:productId
// @access  Protected/User
export const removeProductFromWishlist = catchAsync(async (req, res, next) => {
  // $pull => remove productId from wishlist array if productId exist
  const user = await User.findByIdAndUpdate(
    req.user?.id,
    {
      $pull: { wishlist: req.params.productId },
    },
    { new: true },
  );

  if (!user) {
    return next(new AppError(`There is no wishlist for this user id : ${req?.user?.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Product removed successfully from your wishlist.',
    data: user.wishlist,
  });
});

// @desc    Get logged user wishlist
// @route   GET /api/v1/wishlists
// @access  Protected/User
export const getLoggedUserWishlist = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user?.id).populate('wishlist');

  if (!user) {
    return next(new AppError(`There is no wishlist for this user id : ${req?.user?.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    results: user.wishlist.length,
    data: user.wishlist,
  });
});
