import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  allCategory: [],
  loadingCategory: false,
  allSubCategory: [],
  loadingSubCategory: false,
  product: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: initialValue,
  reducers: {
    setAllCategory: (state, action) => {
      state.allCategory = [...action.payload];
    },
    setLoadingCategory: (state, action) => {
      state.loadingCategory = action.payload;
    },
    setAllSubCategory: (state, action) => {
      state.allSubCategory = [...action.payload];
    },
    setLoadingSubCategory: (state, action) => {
      state.loadingSubCategory = action.payload;
    },
  },
});

export const {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
  setLoadingSubCategory,
} = productSlice.actions;

export default productSlice.reducer;
