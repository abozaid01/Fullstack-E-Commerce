interface Product {
  id: string;
  title: string;
  description: string;
  quantity: number;
  colors: string[];
  price: number;
  imageCover: string;
  images: string[];
  __v: number | undefined;
}

export default Product;
