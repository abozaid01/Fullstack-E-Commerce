import { check } from 'express-validator';
import User from '../models/user.models';
import validatorMiddleware from '../middlewares/validation.middleware';

export const signupValidtor = [
  check('name').notEmpty().withMessage('user required').isLength({ min: 3 }).withMessage(`Too short user's name`),

  check('email')
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error('E-mail already in user'));
        }
      }),
    ),

  check('password')
    .notEmpty()
    .withMessage('Password required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error('Password Confirmation incorrect');
      }
      return true;
    }),

  check('passwordConfirm').notEmpty().withMessage('Password confirmation required'),

  validatorMiddleware,
];

export const loginValidator = [
  check('email').notEmpty().withMessage('Email required').isEmail().withMessage('Invalid email address'),

  check('password').notEmpty().withMessage('Password required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  validatorMiddleware,
];

export const verifyEmailValidator = [
  check('verifyToken').notEmpty().withMessage('verification token is required').isHash('sha256').withMessage('invalid Token'),

  validatorMiddleware,
];

export const forgetPasswordValidator = [
  check('email').notEmpty().withMessage('Email required').isEmail().withMessage('Invalid email address'),

  validatorMiddleware,
];

export const resetPasswordValidator = [
  check('resetToken').notEmpty().withMessage('reset Token required').isHash('sha256').withMessage('invaild token'),

  check('password')
    .notEmpty()
    .withMessage('Password required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error('Password Confirmation incorrect');
      }
      return true;
    }),

  check('passwordConfirm').notEmpty().withMessage('Password confirmation required'),

  validatorMiddleware,
];
