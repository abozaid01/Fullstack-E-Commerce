import { Schema, model } from 'mongoose';
import ICoupon from '../interfaces/coupon.interface';

const couponSchema = new Schema<ICoupon>(
  {
    name: {
      type: String,
      trim: true,
      uppercase: true,
      required: [true, 'Coupon name required'],
      unique: true,
    },
    expire: {
      type: Date,
      required: [true, 'Coupon expire time required'],
    },
    discount: {
      type: Number,
      required: [true, 'Coupon discount value required'],
    },
  },
  { timestamps: true },
);

const Coupon = model<ICoupon>('Coupon', couponSchema);

export default Coupon;
