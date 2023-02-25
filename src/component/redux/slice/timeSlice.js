import { createSlice } from "@reduxjs/toolkit";

const availableHoursSlice = createSlice({
  name: "time",
  initialState: {
    selectedHour: null,
    booked: [],
    available: [],
    hours: [9, 10, 11, 12, 1, 2, 3, 4, 5],
  },
  reducers: {
    setSelectedHour: (state, action) => {
      state.selectedHour = action.payload;
    },
    setHours: (state, action) => {
      state.hours = action.payload;
    },
    setBooked: (state, action) => {
      state.booked = action.payload;
    },
    setAvailable: (state, action) => {
      state.available = action.payload;
    },
  },
});

export const { setSelectedHour, setHours, setBooked, setAvailable } =
  availableHoursSlice.actions;

export default availableHoursSlice.reducer;
