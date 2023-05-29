import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

const dateSlice = createSlice({
  name: "date",
  initialState: {
    selectedDate: "",
  },
  reducers: {
    setSelectedDate: produce((state, action) => {
      if (action.payload && !(typeof action.payload === "string")) {
        state.selectedDate = action.payload.toDateString();
      } else {
        state.selectedDate = action.payload;
      }
    }),
  },
});

export const { setSelectedDate } = dateSlice.actions;
export default dateSlice.reducer;
