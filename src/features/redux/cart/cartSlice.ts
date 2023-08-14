import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Cartstate, DispatchProps } from "../reduxType";
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
      let found = false;
      for (const item of state.cart) {
        if (
          item.id === newItem.id &&
          newItem.iceLevel === item.iceLevel &&
          newItem.suggarLevel === item.suggarLevel
        ) {
          found = true;
          item.quantity++;
          item.totalPrice = item.quantity * item.unitPrice;
          break;
        }
      }
      if (!found) {
        state.cart.push(newItem);
      }
    },
    deleteItem(state: Cartstate, action: PayloadAction<DispatchProps>) {
      state.cart = state.cart.filter(
        (item) =>
          item.id !== action.payload.id ||
          item.iceLevel !== action.payload.iceLevel ||
          item.suggarLevel !== action.payload.suggarLevel,
      );
    },
    increaseItemQuantity(
      state: Cartstate,
      action: PayloadAction<DispatchProps>,
    ) {
      const item = state.cart.find(
        (item) =>
          item.id === action.payload.id &&
          item.iceLevel === action.payload.iceLevel &&
          item.suggarLevel === action.payload.suggarLevel,
      );
      if (!item) return;
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },

    decreaseItemQuantity(
      state: Cartstate,
      action: PayloadAction<DispatchProps>,
    ) {
      const item = state.cart.find(
        (item) =>
          item.id === action.payload.id &&
          item.iceLevel === action.payload.iceLevel &&
          item.suggarLevel === action.payload.suggarLevel,
      );
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
