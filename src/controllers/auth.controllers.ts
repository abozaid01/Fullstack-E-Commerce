import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { verifyAsync } from '../utils/verifyJwtAsync';
import { createAndSendToken } from '../utils/createAndSignToken';
import AppError from '../utils/AppError';
import Logger from '../utils/Logger';
import User from '../models/user.models';
import Email from '../utils/Email';
import crypto from 'crypto';

// @desc    Register a new user
// @route   POST /api/v1/auth/signup
// @access  public
export const signup = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  // 1) create the User and store it into DB
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    // role: req.body.role, // NEVER DO THIS ❌
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // 2) Generate the random veify token email
  // Done in pre('save') middleware
  newUser.emailVerificationToken = undefined; // DON'T LEAK it in the response

  // 3) Authnicate the user by sending JWT Access and Refresh Tokne
  await createAndSendToken(newUser, 201, res);

  // 4) send the verification Email
  try {
    const verificationRoute = `${req.protocol}://${req.get('host')}/auth/activate/${newUser.emailVerificationToken}`;
    await new Email(newUser, verificationRoute).verifyEmail();
  } catch (err) {
    Logger.error(`Error sending verification email to user with email: ${newUser.email}.`);
    Logger.error(err);

    // return next(new AppError('There was an error sending the email. Try again later!', 500));
  }

  // 5) TODO: Clinet MUST implement GET /auth/activate/:resetToken and submit a form with to PATCH /api/v1/auth/verify-email/:verifyToken
});

// @desc    Authenticate and log in a user
// @route   POST /api/v1/auth/login
// @access  public
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) check if email and password is porvided by the user
  if (!email || !password) return next(new AppError('please enter your email and password', 400));

  // 2) check if user exist && pasword is correct in the DB
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password, user.password as string)))
    return next(new AppError('email or password incorrect', 401));

  // 3) if everything is okay, send the jwt
  createAndSendToken(user, 200, res);
});

// @desc    Get new accessToken using the refresh token
// @route   GET /api/v1/auth/refresh
// @access  public
export const getAccessToken = catchAsync(async (req: Request, res, next) => {
  // 1) Check if the refresh token exists
  let refreshToken = '';
  if (req.cookies && req.cookies.jwt) refreshToken = req.cookies.jwt;
  if (!refreshToken) return next(new AppError('No authentication refreshToken provided.', 401));

  // 2) validate the refresh token
  const decoded = await verifyAsync(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);

  // 3) check if user still exists in DB - (not Deleted)
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonged to this token is no longer exist', 401));
  }

  // 4) check if the user changed the password after the token was issued
  if (currentUser.passwordChangedAfter(decoded.iat as number))
    return next(new AppError('user recently changed password please login again!', 401));

  // 5) if everythink is okay, genreate the accessToken
  createAndSendToken(currentUser, 200, res);
});

// @desc    logout and invalidate refresh token - Delete the refresh token and NOT let it last for the full duration
// @route   DELETE /api/v1/auth/logout
// @access  protected
export const logout = catchAsync(async (req: Request, res, next) => {
  // Access Token should be erased from the frontend

  // 1) Check if the refresh Token exists
  let refreshToken = '';
  if (req.cookies && req.cookies.jwt) refreshToken = req.cookies.jwt;
  if (!refreshToken) return next(new AppError('No authentication refreshToken provided.', 401));

  // 2) Check if the provided refresh Token matches the one stored in DB
  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) {
    // clear Refresh Token cookie
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      // sameSite: 'none'
    });
    return res.status(204).json({ status: 'success' });
    Logger.debug('token NOT found in DB');
  }

  // 3) Delete refreshToken in DB
  Logger.debug('token found in DB');
  await User.findByIdAndUpdate(foundUser.id, { $unset: { refreshToken: 1 } }, { runValidators: true, new: true });

  // 4) clear RefershToken cookie
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    // sameSite: 'none'
  });

  res.status(204).json({ status: 'success' });
});

// @desc    verify Email - update the verified property to TRUE if provided token === hashed emailVerificationToken
// @route   PATCH /api/v1/auth/verify-email/:verifyToken
// @access  protected
export const verifyEmail = catchAsync(async (req: Request, res, next) => {
  const { verifyToken } = req.params;

  // 2) Get user based on the token
  const user = await User.findOne({
    emailVerificationToken: verifyToken,
  });

  // 3) Check if token is correct, By Checking there is a user document exist
  if (!user) {
    return next(new AppError('Token is invalid', 400));
  }

  await User.findByIdAndUpdate(
    req.user?.id,
    {
      $set: { verified: true },
      $unset: { emailVerificationToken: 1 },
    },
    { runValidators: true, new: true },
  );

  res.json({
    status: 'success',
    message: 'you are now verified',
  });
});

// @desc    re-send verification Email
// @route   GET /api/v1/auth/send-verify-email
// @access  protected
export const sendVerifyEmail = catchAsync(async (req: Request, res, next) => {
  // 1) Retrive the verify Token from DB
  const user = await User.findById(req.user?.id).select('emailVerificationToken');
  const verifyToken = user?.emailVerificationToken;

  // 2) send the verification Email
  try {
    const verificationRoute = `${req.protocol}://${req.get('host')}/auth/activate/${verifyToken}`;
    await new Email(req.user!, verificationRoute).verifyEmail();
  } catch (err) {
    Logger.error(err);

    return next(new AppError('There was an error sending the email. Please try again later!', 500));
  }

  res.status(200).json({
    status: 'success',
    message: 'verification Link is snet to mail',
  });
});

// @desc    initiate the password reset process by sending a reset token to the user's email
// @route   POST /api/v1/auth/forget-password
// @access  Public
export const forgetPassword = catchAsync(async (req, res, next) => {
  // 1) Get User based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError('There is no user with this email address', 404));

  // 2) Generate the random reset token password
  const resetToken = await user.createPasswordResetToken();

  // 3) sent it back to user's email
  try {
    const resetURL = `${req.protocol}://${req.get('host')}/auth/reset-password/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });
    Logger.error(err);

    return next(new AppError('There was an error sending the email. Try again later!', 500));
  }

  // 4) TODO: Clinet MUST implement GET /auth/reset-password/:resetToken and submit a form with password and passwordConfirm to PATCH /api/v1/auth/reset-password/:resetToken
});

// @desc    reset user's password using the reset token
// @route   PATCH /api/v1/auth/reset-password/:resetToken
// @access  Public
export const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // 1) Get the temp plain password from the PATCH request params, and Hash to compare it with the stored one
  const { resetToken } = req.params;
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // 2) Get user based on the token
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpires: { $gt: new Date() },
  });

  // 3) Check if token is correct and has not expired, By Checking there is a user document exist
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  // 4) Set the new password ana save it
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  await user.save(); // use .save() instead of update to run the pre('save') middleware for hashing new Password

  // 5) Update changedPasswordAt property for the user
  // Done in the pre('save') Middleware at the Model

  // 6) Log the user in, send JWT
  createAndSendToken(user, 200, res);
});
