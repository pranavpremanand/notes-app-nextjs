import { configureStore } from "@reduxjs/toolkit";
import storeSlice from "./storeSlice";

const store = configureStore({
  reducer: {
    store: storeSlice,
  },
});

export default store;
