import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slices/cartSlice";
import favsReducer from '../slices/favSlice';

const store = configureStore({
  reducer: {
    favs: favsReducer,
    cart: cartSlice
  }
});

export default store;