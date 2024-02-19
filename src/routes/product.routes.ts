import { Router } from 'express';
import * as productController from '../controllers/product.controllers';

const router = Router();

router.route('/').get(productController.getProducts).post(productController.createProduct);
router.route('/:id').get(productController.getProduct).patch(productController.updateProduct).delete(productController.deleteProduct);

export default router;
