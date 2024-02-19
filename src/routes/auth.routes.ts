import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import * as authController from '../controllers/auth.controllers';
import * as authValidtor from '../validations/auth.validator';

const router = Router();

router.route('/signup').post(authValidtor.signupValidtor, authController.signup);
router.route('/login').post(authValidtor.loginValidator, authController.login);
router.get('/refresh', authController.getAccessToken);
router.route('/logout').delete(authenticate, authController.logout);

router.route('/forget-password').post(authValidtor.forgetPasswordValidator, authController.forgetPassword);
router.route('/reset-password/:resetToken').patch(authValidtor.resetPasswordValidator, authController.resetPassword);

router.use(authenticate);
router.patch('/verify-email/:verifyToken', authValidtor.verifyEmailValidator, authController.verifyEmail);
router.get('/send-verify-email', authController.sendVerifyEmail); // RE-SEND

export default router;
