import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productslice";
import cartReducer from "../features/cartslice/cartslice";
import checkOutReducer from "../features/checkoutslice/checkoutslice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    checkout: checkOutReducer,
  },
});
