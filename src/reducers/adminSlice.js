import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: true,
  admin: {
    adminId: "",
    name: "Rhitam",
    role: "Admin",
  },
  activePage: "Courses",
};
export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setIsLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
    setAdmin: (state, { payload }) => {
      state.admin = payload;
    },
    resetAdmin: (state) => {
      state.admin = initialState.admin;
      state.isLoggedIn = false;
    },
    setActivePage: (state, { payload }) => {
      state.activePage = payload;
    },
  },
});
export const { setIsLoggedIn, setAdmin, resetAdmin, setActivePage } =
  adminSlice.actions;
export default adminSlice.reducer;
