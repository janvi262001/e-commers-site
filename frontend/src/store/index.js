import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducer/product";
import cartReducer from "./reducer/cart";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});
