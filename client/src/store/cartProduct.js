import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cartItem",
  initialState: initialValue,
  reducers: {
    handleAddItemCart: (state, action) => {
      state.cart = [...action.payload];
    },
  },
});

export const { handleAddItemCart } = cartSlice.actions;

export default cartSlice.reducer;
