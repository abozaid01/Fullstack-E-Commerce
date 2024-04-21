import { Schema, model } from 'mongoose';
import IProduct from '../interfaces/product.interface';

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: [3, 'Too short product title'],
      maxlength: [100, 'Too long product title'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      minlength: [10, 'Too short product description'],
    },
    longDescription: {
      type: String,
      required: [true, 'Product description is required'],
      minlength: [30, 'Too short product description'],
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
    priceAfterDiscount: {
      type: Number,
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
    category_id: {
      type: Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Product must be belong to category'],
    },
    subcategories_ids: [
      {
        type: Schema.ObjectId,
        ref: 'SubCategory',
      },
    ],
    brand_id: {
      type: Schema.ObjectId,
      ref: 'Brand',
    },
    ratingsAverage: {
      type: Number,
      min: [1, 'Rating must be above or equal 1.0'],
      max: [5, 'Rating must be below or equal 5.0'],
      // set: (val) => Math.round(val * 10) / 10, // 3.3333 * 10 => 33.333 => 33 => 3.3
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// virtual slug property 'Apple iPhone 12 Pro Max' => 'apple-iphone-12-pro-max'
productSchema.virtual<IProduct>('slug').get(function () {
  // 'this' refers to the document
  return this.title
    ?.toLowerCase() // Convert to lowercase
    .replace(/[^a-zA-Z0-9 -]/g, '') // Remove special characters except for space and hyphen
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens;
});

const Product = model<IProduct>('Product', productSchema);

export default Product;
