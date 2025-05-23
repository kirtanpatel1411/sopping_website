import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    const products = await axios.get(API_URL);
    return products.data;
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
  selectedProduct: null,
  cartItem: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
