import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  addressList: [],
};
const addressSlice = createSlice({
  name: "address",
  initialState: initialValue,
  reducers: {
    handleAddress: (state, action) => {
      state.addressList = [...action.payload];
    },
  },
});

export const { handleAddress } = addressSlice.actions;
export default addressSlice.reducer;
