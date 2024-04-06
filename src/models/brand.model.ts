import { Schema, model } from 'mongoose';
import IBrand from '../interfaces/brand.inerface';

const brandSchema = new Schema<IBrand>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Too short Brand title'],
      maxlength: [32, 'Too long Brand title'],
    },
    description: {
      type: String,
      // required: [true, 'Brand description is required'],
      // minlength: [20, 'Too short Brand description'],
    },
    imageCover: {
      type: String,
      // required: [true, 'Brand Image cover is required'],
    },
  },
  {
    timestamps: true,
  },
);

const Brand = model<IBrand>('Brand', brandSchema);

export default Brand;
