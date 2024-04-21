import ISubCategoy from './subCategory.interface';

interface Category {
  id: string;
  name: string;
  description?: string;
  imageCover: string;
  subcategories: ISubCategoy[];
  __v: number | undefined;
}

export default Category;
