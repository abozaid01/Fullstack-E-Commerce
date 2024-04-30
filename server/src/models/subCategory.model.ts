import { Schema, model } from 'mongoose';
import ISubCategory from '../interfaces/subCategory.interface';

const subCategorySchema = new Schema<ISubCategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Too short Sub Category title'],
      maxlength: [32, 'Too long Sub Category title'],
      unique: true,
    },
    description: {
      type: String,
      // required: [true, 'Sub Category description is required'],
      // minlength: [20, 'Too short Sub Category description'],
    },
    imageCover: {
      type: String,
      // required: [true, 'Sub Category Image cover is required'],
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      validate: {
        validator: async function (categoryId: unknown): Promise<boolean> {
          const category = await model('Category').findById(categoryId);
          return !!category;
        },
        message: 'Invalid category ID. Please provide a valid category ID.',
      },
      required: [true, 'SubCategory must belong to a parent category'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// virtual slug property 'paul and bear' => 'paul-and-bear'
subCategorySchema.virtual<ISubCategory>('slug').get(function () {
  // 'this' refers to the document
  return this.name
    ?.toLowerCase() // Convert to lowercase
    .replace(/[^a-zA-Z0-9 -]/g, '') // Remove special characters except for space and hyphen
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens;
});

const SubCategory = model<ISubCategory>('SubCategory', subCategorySchema);

export default SubCategory;
