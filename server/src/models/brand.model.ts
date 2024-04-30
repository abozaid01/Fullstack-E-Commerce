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
      unique: true,
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// virtual slug property 'paul and bear' => 'paul-and-bear'
brandSchema.virtual<IBrand>('slug').get(function () {
  // 'this' refers to the document
  return this.name
    ?.toLowerCase() // Convert to lowercase
    .replace(/[^a-zA-Z0-9 -]/g, '') // Remove special characters except for space and hyphen
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens;
});

const Brand = model<IBrand>('Brand', brandSchema);

export default Brand;
