import User from '../models/user.models';
import AppError from '../utils/AppError';
import { catchAsync } from '../utils/catchAsync';

// @desc    Add address to user addresses list
// @route   POST /api/v1/addresses
// @access  Protected/User
export const addAddress = catchAsync(async (req, res, next) => {
  // $addToSet => add address object to user addresses  array if address not exist
  const user = await User.findByIdAndUpdate(
    req.user?.id,
    {
      $addToSet: { addresses: req.body },
    },
    { new: true },
  );

  if (!user) {
    return next(new AppError(`There is no addresses for this user id : ${req?.user?.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Address added successfully.',
    data: user.addresses,
  });
});

// @desc    Remove address from user addresses list
// @route   DELETE /api/v1/addresses/:addressId
// @access  Protected/User
export const removeAddress = catchAsync(async (req, res, next) => {
  // $pull => remove address object from user addresses array if addressId exist
  const user = await User.findByIdAndUpdate(
    req.user?.id,
    {
      $pull: { addresses: { _id: req.params.addressId } },
    },
    { new: true },
  );

  if (!user) {
    return next(new AppError(`There is no addresses for this user id : ${req?.user?.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Address removed successfully.',
    data: user.addresses,
  });
});

// @desc    Get logged user addresses list
// @route   GET /api/v1/addresses
// @access  Protected/User
export const getLoggedUserAddresses = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user?.id).populate('addresses');

  if (!user) {
    return next(new AppError(`There is no addresses for this user id : ${req?.user?.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    results: user.addresses.length,
    data: user.addresses,
  });
});
