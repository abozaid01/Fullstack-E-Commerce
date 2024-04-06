import { Router } from 'express';
import { authenticate, authorize, verifyEmail } from '../middlewares/auth.middleware';
import { resizeSingleImg, uploadSingleImg } from '../middlewares/upload.middleware';
import * as categoriesController from '../controllers/category.controllers';
import * as categoryValidtor from '../validations/category.validator';
import subcategoriesRouter from './subCategory.routes';
import productRoutes from './product.routes';

const router = Router();

// Nested route
router.use('/:categoryId/subcategories', subcategoriesRouter);
router.use('/:categoryId/products', productRoutes);

router.route('/').get(categoriesController.getCategories);
router.route('/:id').get(categoryValidtor.getCategoryValidator, categoriesController.getCategory);

// Protect all routes after this Middelware
router.use(authenticate, verifyEmail, authorize('admin'));

router
  .route('/')
  .post(uploadSingleImg('imageCover'), categoryValidtor.createCategoryValidator, resizeSingleImg, categoriesController.createCategory);
router
  .route('/:id')
  .patch(uploadSingleImg('imageCover'), categoryValidtor.updateCategoryValidator, resizeSingleImg, categoriesController.updateCategory)
  .delete(categoryValidtor.deleteCategoryValidator, categoriesController.deleteCategory);

export default router;
