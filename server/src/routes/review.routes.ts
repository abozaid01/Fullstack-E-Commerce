import { Router } from 'express';
import { authenticate, authorize, verifyEmail } from '../middlewares/auth.middleware';
import * as reviewController from '../controllers/review.controllers';
import * as reviewValidator from '../validations/review.validator';

const router = Router({ mergeParams: true });

router.route('/').get(reviewValidator.getAllReviewsValidator, reviewController.getReviews);
router.route('/:id').get(reviewValidator.getReviewValidator, reviewController.getReview);

// Protect all routes after this Middelware
router.use(authenticate, verifyEmail, authorize('user'));

router
  .route('/')
  .post(reviewController.setUserId, reviewController.setProductId, reviewValidator.createReviewValidator, reviewController.createReview);

router
  .route('/:id')
  .patch(reviewValidator.updateReviewValidator, reviewController.updateReview)
  .delete(authorize('user', 'admin'), reviewValidator.deleteReviewValidator, reviewController.deleteReview);

export default router;
