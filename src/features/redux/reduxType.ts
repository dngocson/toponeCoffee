export interface CartItem {
  key?: number;
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image: string;
  iceLevel: number | null;
  suggarLevel: number | null;
}
export interface Cartstate {
  cart: CartItem[];
}

export interface Gpiprops {
  status: "idle" | "loading" | "error";
  position: {
    latitude: number;
    longitude: number;
  };
  address: string;
  error: string;
}
export interface DispatchProps {
  id: number;
  iceLevel: number | null;
  suggarLevel: number | null;
}
