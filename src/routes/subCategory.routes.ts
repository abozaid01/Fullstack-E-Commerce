import { Router } from 'express';
import { authenticate, authorize, verifyEmail } from '../middlewares/auth.middleware';
import { resizeSingleImg, uploadSingleImg } from '../middlewares/upload.middleware';
import * as subCategoriesController from '../controllers/subCategory.controllers';
import * as subCategoryValidtor from '../validations/subCategory.validator';
import productRoutes from './product.routes';

const router = Router({ mergeParams: true });

// Nested routes
router.use('/:subcategoryId/products', productRoutes);

router.route('/').get(subCategoryValidtor.getAllSubcategoriesValidator, subCategoriesController.getSubCategories);
router.route('/:id').get(subCategoryValidtor.getSubCategoryValidator, subCategoriesController.getSubCategory);

// Protect all routes after this Middelware
router.use(authenticate, verifyEmail, authorize('admin'));

router
  .route('/')
  .post(
    uploadSingleImg('imageCover'),
    subCategoriesController.setSubCategoryId,
    subCategoryValidtor.createSubCategoryValidator,
    resizeSingleImg,
    subCategoriesController.createSubCategory,
  );

router
  .route('/:id')
  .patch(
    uploadSingleImg('imageCover'),
    subCategoryValidtor.updateSubCategoryValidator,
    resizeSingleImg,
    subCategoriesController.updateSubCategory,
  )
  .delete(subCategoryValidtor.deleteSubCategoryValidator, subCategoriesController.deleteSubCategory);

export default router;
