import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Cartstate } from "../reduxType";
import { RootState } from "../store";

const initialState = {
  cart: [],
} as Cartstate;
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state: Cartstate, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      if (!existingItem) state.cart.push(newItem);
      else {
        existingItem.quantity++;
        existingItem.totalPrice =
          existingItem.quantity * existingItem.unitPrice;
      }
    },
    deleteItem(state: Cartstate, action: PayloadAction<number>) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseItemQuantity(state: Cartstate, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.id === action.payload);
      if (!item) return;
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state: Cartstate, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.id === action.payload);
      if (!item) return;
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart(state: Cartstate) {
      state.cart = [];
    },
  },
});
export const {
  addItem,
  decreaseItemQuantity,
  deleteItem,
  clearCart,
  increaseItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;

// helper functions:
export const getCart = (state: RootState) => state.cart.cart;
export const getTotalCartQuantity = (state: RootState) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
export const getTotalCartPrice = (state: RootState) =>
  state.cart.cart.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  );
export const getCurrentQuantitybyId = (id: number) => (state: RootState) =>
  state.cart.cart.find((item) => item.id === id)?.quantity ?? 0;
