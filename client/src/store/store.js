import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartProduct";
import productReducer from "./productSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cartItem: cartReducer,
  },
});
