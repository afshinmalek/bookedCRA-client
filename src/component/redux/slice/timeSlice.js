import { createSlice } from "@reduxjs/toolkit";

const availableHoursSlice = createSlice({
  name: "time",
  initialState: {
    selectedHour: null,
    hours: [9, 10, 11, 12, 1, 2, 3, 4, 5],
  },
  reducers: {
    setSelectedHour: (state, action) => {
      state.selectedHour = action.payload;
    },
    setHours: (state, action) => {
      state.hours = action.payload;
    },
  },
});

export const { setSelectedHour, setHours } = availableHoursSlice.actions;

export default availableHoursSlice.reducer;
