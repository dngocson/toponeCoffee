import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Cartstate } from "../reduxType";

const initialState = {
  cart: [],
} as Cartstate;
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state: Cartstate, action: PayloadAction<CartItem>) {
      state.cart.push(action.payload);
    },
    deleteItem() {},
    increaseItemQuantity() {},
    decreaseItemQuantity() {},
    clearCart() {},
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
