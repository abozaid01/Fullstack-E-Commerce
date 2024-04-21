import { Router } from 'express';
import { resizeImgs, uploadImgs } from '../middlewares/upload.middleware';
import { authenticate, authorize, verifyEmail } from '../middlewares/auth.middleware';
import * as productController from '../controllers/product.controllers';
import * as productValidator from '../validations/product.validator';
import reviewRouter from './review.routes';

const router = Router({ mergeParams: true });

router.use('/:productId/reviews', reviewRouter);

router.route('/').get(productValidator.getAllProductsValidator, productController.getProducts);
router.route('/:id').get(productValidator.getProductValidator, productController.getProduct);

// Protect all routes after this Middelware
router.use(authenticate, verifyEmail, authorize('admin'));

router.route('/').post(
  uploadImgs([
    { name: 'imageCover', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]),
  productController.setBrandId,
  productController.setCategoryId,
  productController.setSubcategoryId,
  productValidator.createProductValidator,
  resizeImgs,
  productController.createProduct,
);

router
  .route('/:id')
  .patch(
    uploadImgs([
      { name: 'imageCover', maxCount: 1 },
      { name: 'images', maxCount: 10 },
    ]),
    productValidator.updateProductValidator,
    resizeImgs,
    productController.updateProduct,
  )
  .delete(productValidator.deleteProductValidator, productController.deleteProduct);

export default router;
