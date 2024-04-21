import { check, body, CustomValidator, param } from 'express-validator';
import validatorMiddleware from '../middlewares/validation.middleware';
import Product from '../models/product.model';
import Cart from '../models/cart.model';

// Custom validator function to check if the product_id exists in the DB
const checkProductExists: CustomValidator = async (value) => {
  if (!value) {
    throw new Error('Cart must have a product');
  }

  const product = await Product.findById(value);
  if (!product) {
    throw new Error('Invalid product ID. product does not exist.');
  }
};

// Custom validator function to check if the cart item exists in the cartItems array in the carts collection
const checkCartItemExists: CustomValidator = async (value) => {
  if (!value) {
    throw new Error('cartItem id required to remove it from user cart');
  }

  const cart = await Cart.findOne({ 'cartItems._id': value });
  if (!cart) {
    throw new Error('Invalid cartItem ID. cart Item does not exist.');
  }
};

export const getBrandValidator = [check('id').isMongoId().withMessage('Invalid brand id format'), validatorMiddleware];

export const addToCartValidator = [
  body('productId')
    .notEmpty()
    .withMessage("'productId' field is required")
    .isMongoId()
    .withMessage('Invalid productId format')
    .custom(checkProductExists),

  body('color')
    .optional()
    .isString()
    .withMessage('"color" must be string')
    .isLength({ min: 3 })
    .withMessage('Too short color name')
    .isLength({ max: 20 })
    .withMessage('too long color name'),

  validatorMiddleware,
];

export const removeItemValidator = [
  param('itemId')
    .notEmpty()
    .withMessage("'itemId' field is required")
    .isMongoId()
    .withMessage('Invalid itemId format')
    .custom(checkCartItemExists),

  validatorMiddleware,
];

export const updateCartItemQuantityValidator = [
  param('itemId')
    .notEmpty()
    .withMessage("'itemId' field is required")
    .isMongoId()
    .withMessage('Invalid itemId format')
    .custom(checkCartItemExists),

  body('quantity')
    .notEmpty()
    .withMessage("'quantity' field is required")
    .isFloat({ min: 1 })
    .withMessage('quantity value must be a positve number'),

  validatorMiddleware,
];

export const applyCouponValidator = [
  body('coupon')
    .notEmpty()
    .withMessage("'coupon' field is requierd with the name of coupon")
    .isString()
    .withMessage("'coupon' field must be string"),

  validatorMiddleware,
];
