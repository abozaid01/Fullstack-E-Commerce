import { Schema, model, Query } from 'mongoose';
import ICategory from '../interfaces/category.interface';
import SubCategory from './subCategory.model';

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Too short Category title'],
      maxlength: [32, 'Too long Category title'],
    },
    description: {
      type: String,
      // required: [true, 'Category description is required'],
      // minlength: [20, 'Too short Category description'],
    },
    imageCover: {
      type: String,
      // required: [true, 'Category Image cover is required'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual Populate: Connects Category model to its SubCategories using parent referencing.
categorySchema.virtual<ICategory>('subcategories', {
  ref: 'SubCategory',
  foreignField: 'category_id',
  localField: '_id',
});

// Query Middleware to populate subCategories when Reading categories
categorySchema.pre<Query<ICategory, ICategory[]>>(/^find/, function (next) {
  this.populate({
    path: 'subcategories',
    select: '-__v -updatedAt -createdAt',
  });
  next();
});

// Query Middleware to onDelete Cascade all subCategories
categorySchema.pre<Query<ICategory, ICategory[]>>('findOneAndDelete', async function (next) {
  const categoryId = this.getQuery()._id;
  try {
    await SubCategory.deleteMany({ category_id: categoryId });
    next();
  } catch (error) {
    next(error as Error);
  }
});

const Category = model<ICategory>('Category', categorySchema);

export default Category;
