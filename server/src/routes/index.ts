import { Router } from 'express';
import prodductRouter from './product.routes';
import userRouter from './user.routes';
import authRouter from './auth.routes';
import brandRouter from './brand.routes';
import categoryRouter from './category.routes';
import subCategoryRouter from './subCategory.routes';
import reviewRouter from './review.routes';
import cartRouter from './cart.routes';
import couponRouter from './coupon.routes';
import wishlistRouter from './wishlist.routes';
import addressRouter from './address.routes';

const router = Router();

router.use('/api/v1/auth', authRouter);
router.use('/api/v1/users', userRouter);
router.use('/api/v1/products', prodductRouter);
router.use('/api/v1/brands', brandRouter);
router.use('/api/v1/categories', categoryRouter);
router.use('/api/v1/subcategories', subCategoryRouter);
router.use('/api/v1/reviews', reviewRouter);
router.use('/api/v1/carts', cartRouter);
router.use('/api/v1/coupons', couponRouter);
router.use('/api/v1/wishlists', wishlistRouter);
router.use('/api/v1/addresses', addressRouter);

export default router;
