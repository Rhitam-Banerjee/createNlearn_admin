import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./reducers/adminSlice";
import detailSlice from "./reducers/detailSlice";

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    details: detailSlice,
  },
});
