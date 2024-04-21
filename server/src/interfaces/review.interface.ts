import { Types } from 'mongoose';

interface Review {
  id: string;
  review: string;
  rating: number;
  user_id: Types.ObjectId;
  product_id: Types.ObjectId;
  calcAvgRatings(productId: Types.ObjectId): void;
  __v: number | undefined;
}

export default Review;
