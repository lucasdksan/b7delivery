import { CartItem } from './CartItem';
import { Address } from './Address';

export type Order = {
    id: number;
    status: "preparing"|"sent"|"delivered";
    orderDate: string;
    userid: string;
    shippingAddress: Address;
    shippingPrice: number;
    paymentType: "money"|"card";
    paymentChange?: number;
    coupon?: string;
    couponDiscount?: number;
    products: CartItem[];
    subtotal: number;
    total: number;
}