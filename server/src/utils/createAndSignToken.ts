import { Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.models';
import IUser from '../interfaces/user.interface';

export const createAndSendToken = async (user: IUser, statusCode: number, res: Response) => {
  const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '1d' });

  // Store refresh token in the database; can be cross-referenced when it is sent back to create another accessToken ; also To invalidate that refresh token if the current user logged out (before 1 day has expired)
  await User.findByIdAndUpdate(user.id, { refreshToken }, { new: true, runValidators: true });

  // Remove password, refreshToken, active, __v properites from the output
  user.password = undefined;
  user.__v = undefined;
  user.active = undefined;
  user.refreshToken = undefined;

  // Send JWT
  res.cookie('jwt', refreshToken, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true, // Means that we can't manuiplate the cookie in the browser in any way (NOT even destroy it (delete it))
    secure: process.env.NODE_ENV === 'production',
    // sameSite: 'none',
  });

  res.status(statusCode).json({
    status: 'success',
    accessToken,
    data: {
      user,
    },
  });
};
