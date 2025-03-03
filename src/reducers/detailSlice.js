import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  allCourses: [],
  allClasses: [],
  allTeachers: [],
};
export const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    setAllTeachers: (state, { payload }) => {
      state.allTeachers = payload;
    },
    setAllClasses: (state, { payload }) => {
      state.allClasses = payload;
    },
    setAllCourses: (state, { payload }) => {
      state.allCourses = payload;
    },
  },
});
export const { setAllTeachers, setAllClasses, setAllCourses } =
  detailSlice.actions;
export default detailSlice.reducer;
