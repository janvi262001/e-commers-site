import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product`);
  return response.data;
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isError: false,
    status: "idle",
    sortByPrice: false,
    searchQuery: ''
  },
  reducers: {
    deleteProduct: (state, action) => {
      state.products = state.products.filter((product) => product._id !== action.payload);
    },
    toggleSortByPrice: (state) => {
        state.sortByPrice = !state.sortByPrice;
      },
      setSearchQuery: (state, action) => {
        state.searchQuery = action.payload;
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "succeeded";
        state.isError = action.payload.length === 0;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
        state.isError = true;
      });
  },
});

export const { deleteProduct, toggleSortByPrice, setSearchQuery } = productsSlice.actions;

export default productsSlice.reducer;
