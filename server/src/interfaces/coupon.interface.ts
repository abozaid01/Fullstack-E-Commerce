interface Coupon {
  id: string;
  name: string;
  discount: number;
  expire: Date;
  __v: number | undefined;
}

export default Coupon;
