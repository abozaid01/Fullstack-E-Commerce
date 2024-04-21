import IProduct from './product.interface';
import IUser from './user.interface';

interface Cart {
  id: string;
  user_id: IUser;
  cartItems: { _id?: string; product: IProduct | string; quantity: number; color: string; price: number }[];
  totalCartPrice: number;
  totalPriceAfterDiscount?: number;
  __v: number | undefined;
}

export default Cart;
