import { Router } from 'express';
import { authenticate, authorize, verifyEmail } from '../middlewares/auth.middleware';
import * as usersController from '../controllers/user.controllers';
import * as userValidtor from '../validations/user.validator';

const router = Router();

// Protect all routes after this Middelware
router.use(authenticate);

router.route('/me').get(usersController.getMe, usersController.getUser).patch(usersController.updateMe).delete(usersController.deleteMe);
router.route('/change-password').patch(verifyEmail, usersController.changePassword);

// Authorize all routes after this Middelware (ONLY ADMIN)
router.use(authorize('admin'));

router.route('/').get(usersController.getUsers);
router.route('/:id').get(userValidtor.getUserValidator, usersController.getUser);

export default router;
