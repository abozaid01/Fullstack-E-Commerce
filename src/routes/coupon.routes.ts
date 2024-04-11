import { Router } from 'express';
import { authenticate, authorize, verifyEmail } from '../middlewares/auth.middleware';
import * as couponController from '../controllers/coupon.controllers';
import * as couponValidtor from '../validations/coupon.validator';

const router = Router();

// Protect all routes after this Middelware
router.use(authenticate, verifyEmail, authorize('admin'));

router.route('/').get(couponController.getCoupons).post(couponValidtor.createCouponValidator, couponController.createCoupon);
router
  .route('/:id')
  .get(couponValidtor.getCouponValidator, couponController.getCoupon)
  .patch(couponValidtor.updateCouponValidator, couponController.updateCoupon)
  .delete(couponValidtor.deleteCouponValidator, couponController.deleteCoupon);

export default router;
