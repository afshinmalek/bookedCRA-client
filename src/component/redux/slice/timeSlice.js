import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

const availableHoursSlice = createSlice({
  name: "time",
  initialState: {
    selectedHour: "",
    timeDate: "",
    booked: [],

    available: [],

    hours: [9, 10, 11, 12, 1, 2, 3, 4, 5],
  },
  reducers: {
    setSelectedHour: produce((state, action) => {
      state.selectedHour = action.payload;
    }),
    setTimeDate: produce((state, action) => {
      state.timeDate = action.payload;
    }),
    setHours: produce((state, action) => {
      state.hours = action.payload;
    }),
    setBooked: produce((state, action) => {
      state.booked = action.payload;
    }),

    setAvailable: produce((state, action) => {
      state.available = action.payload;
    }),
  },
});

export const {
  setSelectedHour,
  setTimeDate,
  setHours,
  setBooked,
  setAvailable,
} = availableHoursSlice.actions;

export default availableHoursSlice.reducer;
