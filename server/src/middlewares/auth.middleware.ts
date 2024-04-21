import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { verifyAsync } from '../utils/verifyJwtAsync';
import AppError from '../utils/AppError';
import User from '../models/user.models';
import Logger from '../utils/Logger';

export const authenticate = catchAsync(async (req: Request, res, next) => {
  let accessToken: string = '';
  // 1) check if the accessToken is exist
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) accessToken = req.headers.authorization.split(' ')[1];

  if (!accessToken)
    return next(
      new AppError('No authentication accessToken provided. Please include a valid accessToken in the Authorization header.', 401),
    );

  // 2) validate the access token
  const decoded = await verifyAsync(accessToken, process.env.ACCESS_TOKEN_SECRET as string);

  // 3) check if user still exists in DB - (not Deleted)
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonged to this token is no longer exist', 401));
  }

  // 4) check if the user changed the password after the token was issued
  if (currentUser.passwordChangedAfter(decoded.iat as number))
    return next(new AppError('user recently changed password please login again!', 401));

  // GRANT ACCESS TO PROTECTED ROUTES
  req.user = currentUser;

  next();
});

export const authorize = (...roles: string[]) => {
  // roles ['admin', 'user', ...]
  return (req: Request, res: Response, next: NextFunction) => {
    // the User Must be logged-in
    if (!req.user) return next(new AppError('You are not authenticated. Please log in to access this resource.', 401));

    if (!roles.includes(req.user.role as string)) {
      Logger.error(`Unauthorized access: User with role ${req.user.role} attempted to perform an unauthorized action.`);

      return next(new AppError("You don't have premissions to preform this action", 403));
    }
    next();
  };
};

export const verifyEmail = catchAsync(async (req: Request, res, next) => {
  const verifiedUser = await User.findById(req.user?.id);
  if (!verifiedUser?.verified) {
    return next(new AppError(`Email not verified. Please verify your email address.`, 401));
  }

  next();
});
