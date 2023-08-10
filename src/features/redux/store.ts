import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart/cartSlice";
import gpiSlice from "./cart/gpiSlice";
const store = configureStore({
  reducer: {
    cart: cartSlice,
    gpi: gpiSlice,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
