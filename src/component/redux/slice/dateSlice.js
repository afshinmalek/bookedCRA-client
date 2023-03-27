import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

const dateSlice = createSlice({
  name: "date",
  initialState: {
    selectedDate: null,
  },
  reducers: {
    setSelectedDate: produce((state, action) => {
      state.selectedDate = action.payload;
    }),
  },
});

export const { setSelectedDate } = dateSlice.actions;
export default dateSlice.reducer;
