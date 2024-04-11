import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { addProductToWishlist, getLoggedUserWishlist, removeProductFromWishlist } from '../controllers/wishlist.contorllers';
import { addProductToWishlistValidator, removeProductFromWishlistValidator } from '../validations/wishlist.validator';
const router = Router();

router.use(authenticate, authorize('user'));

router.route('/').post(addProductToWishlistValidator, addProductToWishlist).get(getLoggedUserWishlist);
router.delete('/:productId', removeProductFromWishlistValidator, removeProductFromWishlist);

export default router;
