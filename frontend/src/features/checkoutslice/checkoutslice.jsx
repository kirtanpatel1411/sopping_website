import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  setItem: [], // Array to store checkout items with quantities
};

const checkOutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    CheckOut: (state, action) => {
      // Find if item already exists in checkout
      const existingItem = state.setItem.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // Update quantity to match cart quantity
        existingItem.quantity = action.payload.quantity;
      } else {
        // Add new item with cart quantity
        state.setItem.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }
    },

    // // Clear checkout items
    // clearCheckout: (state) => {
    //   state.setItem = [];
    // },
  },
});

export const { CheckOut } = checkOutSlice.actions;
export default checkOutSlice.reducer;
