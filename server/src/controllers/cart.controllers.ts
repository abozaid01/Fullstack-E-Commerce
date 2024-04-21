import { catchAsync } from '../utils/catchAsync';
import { Response } from 'express';
import AppError from '../utils/AppError';
import Logger from '../utils/Logger';
import Cart from '../models/cart.model';
import Product from '../models/product.model';
import Coupon from '../models/coupon.model';
import Icart from '../interfaces/cart.interface';

// const Coupon = require('../models/couponModel');

const calcTotalCartPrice = (cart: Icart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  cart.totalCartPrice = totalPrice;
  cart.totalPriceAfterDiscount = undefined;
  return totalPrice;
};

const sendCartResopnse = (res: Response, cart: Icart, message?: string) => {
  res.status(200).json({
    status: 'success',
    message,
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
};

// @desc    Add product to  cart
// @route   POST /api/v1/cart
// @access  Private/User
export const addProductToCart = catchAsync(async (req, res, next) => {
  const { productId, color } = req.body;
  const product = await Product.findById(productId);

  // 1) Get Cart for logged user
  let cart = await Cart.findOne({ user_id: req.user?.id });

  // 2.1) The user Doesn't have any cart, Create it with the selected product
  if (!cart) {
    // create cart fot logged user with product
    cart = await Cart.create({
      user_id: req.user?.id,
      cartItems: [
        {
          product: productId,
          color,
          price: product?.price,
        },
      ],
    });
  }
  // 2.2) user already has cart and want to add product to it
  else {
    const productIndex = cart.cartItems.findIndex((item) => item.product.toString() === productId && item.color === color);

    // 2.2.1) Same Product, update quantity
    if (productIndex > -1) {
      const cartItem = cart.cartItems[productIndex];
      cartItem.quantity += 1;

      cart.cartItems[productIndex] = cartItem;
    }
    // 2.2.2) Different product, push product to cartItems array
    else {
      cart.cartItems.push({
        product: productId as string,
        quantity: 1,
        color,
        price: product?.price as number,
      });
    }
  }

  // 3) Calculate total cart price
  calcTotalCartPrice(cart);
  await cart.save();

  // 4) Send Response
  cart.__v = undefined;
  sendCartResopnse(res, cart, 'Product added to cart successfully');
});

// @desc    Get logged user cart
// @route   GET /api/v1/cart
// @access  Private/User
export const getLoggedUserCart = catchAsync(async (req, res, next) => {
  // 1) Get the user cart
  const cart = await Cart.findOne({ user_id: req?.user?.id }).select('-createdAt -updatedAt -__v');
  if (!cart) {
    return next(new AppError(`There is no cart for this user id : ${req?.user?.id}`, 404));
  }

  // 2) Send Response
  sendCartResopnse(res, cart);
});

// @desc    Remove specific cart item
// @route   DELETE /api/v1/cart/:itemId
// @access  Private/User
export const removeSpecificCartItem = catchAsync(async (req, res, next) => {
  const { itemId } = req.params;

  // 1) validate the ownership, then update the cart by removing the item
  const cart = await Cart.findOneAndUpdate(
    { $and: [{ user_id: req.user?.id }, { 'cartItems._id': itemId }] },
    {
      $pull: { cartItems: { _id: itemId } },
    },
    { new: true },
  );
  if (!cart) {
    // Assume unauhorized action - 0.0000000001% he own it (can't remove before create it)
    Logger.error(`unauthorized user: ${req.user?.id} with ip: ${req.ip} trying to delete a cartItem: ${itemId} that doesn't belong to him`);
    return next(new AppError(`Cart item not found or does not belong to the user: ${req.user?.id}`, 403));
  }

  // 2) Calculate total cart price
  calcTotalCartPrice(cart);
  await cart.save();

  // 3) Send Response
  cart.__v = undefined;
  sendCartResopnse(res, cart, 'item removed from cart successfully');
});

// @desc    Update specific cart item quantity
// @route   PUT /api/v1/cart/:itemId
// @access  Private/User
export const updateCartItemQuantity = catchAsync(async (req, res, next) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  // 1) check if the cart exist and validate the cart ownership
  const cart = await Cart.findOne({ $and: [{ user_id: req.user?.id }, { 'cartItems._id': itemId }] });
  if (!cart) {
    // Assume unauhorized action - 0.0000000001% he own it (can't update quantity before create it)
    Logger.error(
      `unauthorized user: ${req.user?.id} with ip: ${req.ip} trying to update qty for a cartItem: ${itemId} that doesn't belong to him`,
    );
    return next(new AppError(`Cart item not found or does not belong to the user: ${req.user?.id}`, 403));
  }

  // 2) update the cart Item qty
  const itemIndex = cart.cartItems.findIndex((item) => (item._id as string).toString() === itemId);
  if (itemIndex > -1) {
    const cartItem = cart.cartItems[itemIndex];
    cartItem.quantity = quantity;
    cart.cartItems[itemIndex] = cartItem;
  } else {
    return next(new AppError(`there is no item for this id :${req.params.itemId}`, 404));
  }

  // 3) Calculate total cart price
  calcTotalCartPrice(cart);
  await cart.save();

  // 4) Send Response
  cart.__v = undefined;
  sendCartResopnse(res, cart);
});

// @desc    clear logged user cart
// @route   DELETE /api/v1/cart
// @access  Private/User
export const clearCart = catchAsync(async (req, res, next) => {
  // 1) delete user cart
  await Cart.findOneAndDelete({ user_id: req.user?.id });

  // 2) send Response
  res.sendStatus(204);
});

// @desc    Apply coupon on logged user cart
// @route   PUT /api/v1/cart/applyCoupon
// @access  Private/User
export const applyCoupon = catchAsync(async (req, res, next) => {
  // 1) Get coupon based on coupon name
  const coupon = await Coupon.findOne({
    name: req.body.coupon,
    expire: { $gt: Date.now() },
  });

  if (!coupon) {
    return next(new AppError(`Coupon is invalid or expired`, 404));
  }

  // 2) Get logged user cart to get total cart price
  const cart = await Cart.findOne({ user_id: req.user?.id });
  if (!cart) {
    return next(new AppError(`There is no cart for this user id : ${req?.user?.id}`, 404));
  }

  // 3) Calculate price after priceAfterDiscount
  const totalPriceAfterDiscount = Number((cart.totalCartPrice - (cart.totalCartPrice * coupon.discount) / 100).toFixed(2)); // 99.23
  cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
  await cart.save();

  // 4) Send Response
  sendCartResopnse(res, cart);
});
