export interface CartItem {
  key?: number;
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
export interface Cartstate {
  cart: CartItem[];
}
