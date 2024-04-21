import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { createAndSendToken } from '../utils/createAndSignToken';
import AppError from '../utils/AppError';
import User from '../models/user.models';
import Factory from '../utils/FactoryHandler';

// @desc    Get list of users
// @route   GET /api/v1/users
// @access  Private/Admin
export const getUsers = Factory.getAll(User);

// @desc    Get specific user by id
// @route   GET /api/v1/users/:id
// @access  Private/Admin
export const getUser = Factory.getOne(User);

// @desc    Get Logged user data
// @route   GET /api/v1/users/me
// @access  Private/Protect
export const getMe = (req: Request, res: Response, next: NextFunction) => {
  req.params.id = req.user?.id as string;
  next();
};

// @desc    Update logged user data (without password, role)
// @route   PUT /api/v1/users/me
// @access  Private/Protect
export const updateMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // 1) Throw an Error if user want to update his Password
  if (req.body.password || req.body.passwordConfirm)
    return next(new AppError('This Endpoint is not for password updates. Please use /update-password instead.', 400));

  // 2) Filter out unwanted fields that are not allowed to be updated by passing the allowed fields ONLY
  const filterBody = filterObj(req.body, 'name', 'email'); // add more values that you want to include later

  // 3) Update User's data
  const updatedUser = await User.findByIdAndUpdate(req.user?.id, filterBody, { new: true, runValidators: true });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

// @desc    Deactivate logged user
// @route   DELETE /api/v1/users/me
// @access  Private/Protect
export const deleteMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  await User.findByIdAndUpdate(req.user?.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// @desc    Change user's password
// @route   PATCH /api/v1/users/change-password
// @access  Private
export const changePassword = catchAsync(async (req: Request, res, next) => {
  // the User Must be logged-in
  if (!req.user) return next(new AppError('You are not authenticated. Please log in to access this resource.', 401));

  // 1) Get user from DB
  const user = await User.findById(req.user.id).select('+password');
  if (!user) return next(new AppError('User you want to update Not found', 404));

  // 2) Check if the current POSTed password is correct
  const currentPassword = req.body.currentPassword;
  if (!(await user.comparePassword(currentPassword, user.password as string))) return next(new AppError('current password incorrect', 401));

  // 3) Update the Password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4) Log User in, Send JWT
  createAndSendToken(user, 200, res);
});

/* eslint-disable @typescript-eslint/no-explicit-any */
const filterObj = (reqBody: any, ...allowedFields: string[]) => {
  const newObj: any = {};

  Object.keys(reqBody).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = reqBody[el];
  });

  return newObj;
};
