import { Types } from 'mongoose';

interface SubCategory {
  id: string;
  name: string;
  description?: string;
  imageCover?: string;
  category_id: Types.ObjectId;
  __v: number | undefined;
}

export default SubCategory;
