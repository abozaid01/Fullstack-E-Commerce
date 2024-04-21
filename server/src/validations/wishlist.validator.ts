import { body, param, CustomValidator } from 'express-validator';
import validatorMiddleware from '../middlewares/validation.middleware';
import Product from '../models/product.model';

// Custom validator function to check if the product_id exists in the DB
const checkProductExists: CustomValidator = async (value) => {
  if (!value) {
    throw new Error('whishlist must have a product');
  }

  const product = await Product.findById(value);
  if (!product) {
    throw new Error('Invalid product ID. product does not exist.');
  }
};

export const addProductToWishlistValidator = [
  body('productId').isMongoId().withMessage('Invalid product id format').custom(checkProductExists),
  validatorMiddleware,
];

export const removeProductFromWishlistValidator = [
  param('productId').isMongoId().withMessage('Invalid product id format').custom(checkProductExists),
  validatorMiddleware,
];
