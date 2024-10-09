import { configureStore } from '@reduxjs/toolkit';
import productReducer from './src/redux/slice/productSlice';
import wishListReducer from './src/redux/slice/wishListSlice';
import cartReducer from './src/redux/slice/cartSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    wishList: wishListReducer,
    cart: cartReducer,
  },
});

export default store;
