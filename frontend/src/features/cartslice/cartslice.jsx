import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
};
/**
 * This is the reducer for the cart.
 */
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * This is the action to add a product to the cart.
     */
    addtocart: (state, action) => {
      const existingItem = state.cartItem.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItem.push({ ...action.payload, quantity: 1 });
      }
    },

    /**
     * This is the action to remove a product from the cart.
     */
    removeFromCart: (state, action) => {
      state.cartItem = state.cartItem.filter(
        (item) => item.id !== action.payload
      );
    },
    /**
     * This is the action to update the quantity of a product in the cart.
     */
    increaseQuantity: (state, action) => {
      const item = state.cartItem.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    /**
     * This is the action to decrease the quantity of a product in the cart.
     */
    decreaseQuantity: (state, action) => {
      const item = state.cartItem.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});
export const { addtocart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
