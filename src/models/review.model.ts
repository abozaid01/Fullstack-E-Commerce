import { Schema, model, Query } from 'mongoose';
import IReview from '../interfaces/review.interface';
import Product from './product.model';
import Logger from '../utils/Logger';

const reviewSchema = new Schema<IReview>(
  {
    review: {
      type: String,
      // required: [true, "Review can't be empty"],
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    // Parent Referncing
    user_id: {
      type: Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must be belong to a user'],
    },
    product_id: {
      type: Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Review must be belong to a product'],
    },
  },
  { timestamps: true },
);

// Unique compound inde, Ensure that each user make ONLY one review for one product
reviewSchema.index({ product_id: 1, user_id: 1 }, { unique: true });

// ================== Static Methods on the Model ===============
reviewSchema.statics.calcAvgRatings = async function (productId) {
  // This points to the Model
  try {
    const stats = await this.aggregate([
      // Stage 1 : get all reviews in specific product
      {
        $match: { product_id: productId },
      },
      // Stage 2: Grouping reviews based on product_id and calc avgRatings, ratingsQuantity
      {
        $group: { _id: '$product_id', nRating: { $sum: 1 }, avgRatings: { $avg: '$rating' } },
      },
    ]);

    if (stats.length > 0) {
      await Product.findByIdAndUpdate(productId, { ratingsAverage: stats[0].avgRatings, ratingsQuantity: stats[0].nRating });
    } else {
      await Product.findByIdAndUpdate(productId, { ratingsAverage: 0, ratingsQuantity: 0 });
    }
  } catch (error) {
    Logger.error(error);
  }
};

// =================== Documents Middelwares ===================
reviewSchema.post('save', function () {
  // this points to current review Document, this.constructor points to Review Model (Review.calcAvgRatings)
  (this.constructor as unknown as IReview).calcAvgRatings(this.product_id);
});

// ================== Query Middlewares ===============
reviewSchema.pre<Query<IReview[], IReview>>(/^find/, function (next) {
  this.populate({ path: 'user_id', select: 'name profileImg' }); //.populate({ path: 'product_id', select: 'title' });
  next();
});

// Re-Calulate AvgRating when updating or removing document
// NOTE: findByIdAnd is shorthand for <=> findOneAnd
reviewSchema.post<Query<IReview[], IReview>>(/findOneAnd/, function (doc) {
  if (doc) {
    (doc.constructor as unknown as IReview).calcAvgRatings((doc as unknown as IReview).product_id);
  }
});

const Review = model<IReview>('Review', reviewSchema);

export default Review;
