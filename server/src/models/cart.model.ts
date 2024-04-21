import { Schema, model } from 'mongoose';
import ICart from '../interfaces/cart.interface';

const cartSchema = new Schema<ICart>(
  {
    cartItems: [
      {
        product: {
          type: Schema.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          default: 1,
        },
        color: String,
        price: Number,
      },
    ],
    totalCartPrice: Number,
    totalPriceAfterDiscount: Number,
    user_id: {
      type: Schema.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const Cart = model<ICart>('Cart', cartSchema);

export default Cart;
