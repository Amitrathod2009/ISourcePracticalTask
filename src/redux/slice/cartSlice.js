import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.cartItems.find(
        item => item.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {

        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
    },
    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
        if (quantity <= 0) {
          state.cartItems = state.cartItems.filter(item => item.id !== id);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateCartQuantity } = cartSlice.actions;

export default cartSlice.reducer;
