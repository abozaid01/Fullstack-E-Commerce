import { Schema, model } from 'mongoose';
import IProduct from '../interfaces/product.interface';

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Too short product title'],
      maxlength: [100, 'Too long product title'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      minlength: [20, 'Too short product description'],
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      trim: true,
      min: [0, `Price can't be less than 0`],
      max: [200000, 'Too long product price'],
    },
    colors: {
      type: [String],
    },
    imageCover: {
      type: String,
      // required: [true, 'Product Image cover is required'],
    },
    images: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

const Product = model<IProduct>('Product', productSchema);

export default Product;
