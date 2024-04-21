import { Router } from 'express';
import { authenticate, authorize, verifyEmail } from '../middlewares/auth.middleware';
import { resizeSingleImg, uploadSingleImg } from '../middlewares/upload.middleware';
import * as brandsController from '../controllers/brand.controllers';
import * as brandValidtor from '../validations/brand.validator';
import productRoutes from './product.routes';

const router = Router();

router.use('/:brandId/products', productRoutes);

router.route('/').get(brandsController.getBrands);
router.route('/:id').get(brandValidtor.getBrandValidator, brandsController.getBrand);

// Protect all routes after this Middelware
router.use(authenticate, verifyEmail, authorize('admin'));

router.route('/').post(uploadSingleImg('imageCover'), brandValidtor.createBrandValidator, resizeSingleImg, brandsController.createBrand);
router
  .route('/:id')
  .patch(uploadSingleImg('imageCover'), brandValidtor.updateBrandValidator, resizeSingleImg, brandsController.updateBrand)
  .delete(brandValidtor.deleteBrandValidator, brandsController.deleteBrand);

export default router;
