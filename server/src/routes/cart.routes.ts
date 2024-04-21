import { Router } from 'express';
import { authenticate, authorize, verifyEmail } from '../middlewares/auth.middleware';
import * as cartController from '../controllers/cart.controllers';
import * as cartValidtor from '../validations/cart.validator';

const router = Router();

// Protect all routes after this Middelware
router.use(authenticate, verifyEmail, authorize('user'));

router
  .route('/')
  .get(cartController.getLoggedUserCart)
  .post(cartValidtor.addToCartValidator, cartController.addProductToCart)
  .delete(cartController.clearCart);

router.route('/apply-coupon').put(cartValidtor.applyCouponValidator, cartController.applyCoupon);

router
  .route('/:itemId')
  .put(cartValidtor.updateCartItemQuantityValidator, cartController.updateCartItemQuantity)
  .delete(cartValidtor.removeItemValidator, cartController.removeSpecificCartItem);
export default router;
