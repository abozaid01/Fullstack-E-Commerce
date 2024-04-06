import { Types } from 'mongoose';

interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  quantity: number;
  colors: string[];
  price: number;
  priceAfterDiscount: number;
  imageCover: string;
  images: string[];
  category_id: Types.ObjectId;
  subcategories_ids: Types.ObjectId[];
  brand_id: Types.ObjectId;
  ratingsAverage: number;
  ratingsQuantity: number;
  __v: number | undefined;
}

export default Product;
