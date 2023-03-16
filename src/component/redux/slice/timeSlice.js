// import { createSlice } from "@reduxjs/toolkit";

// const availableHoursSlice = createSlice({
//   name: "time",
//   initialState: {
//     selectedHour: null,
//     timeDate: null,
//     booked: [],
//     bookedOne: [],
//     bookedTwo: [],
//     available: [],
//     availableOne: [],
//     availableTwo: [],

//     hours: [9, 10, 11, 12, 1, 2, 3, 4, 5],
//   },
//   reducers: {
//     setSelectedHour: (state, action) => {
//       state.selectedHour = action.payload;
//     },
//     setTimeDate: (state, action) => {
//       state.timeDate = action.payload;
//     },
//     setHours: (state, action) => {
//       state.hours = action.payload;
//     },
//     setBooked: (state, action) => {
//       state.booked = action.payload;
//     },
//     setBookedOne: (state, action) => {
//       state.bookedOne = action.payload;
//     },
//     setBookedTwo: (state, action) => {
//       state.bookedTwo = action.payload;
//     },
//     setAvailable: (state, action) => {
//       state.available = action.payload;
//     },
//     setAvailableOne: (state, action) => {
//       state.availableOne = action.payload;
//     },
//     setAvailableTwo: (state, action) => {
//       state.availableTwo = action.payload;
//     },
//   },
// });

// export const {
//   setSelectedHour,
//   setTimeDate,
//   setHours,
//   setBooked,
//   setBookedOne,
//   setBookedTwo,
//   setAvailable,
//   setAvailableOne,
//   setAvailableTwo,
// } = availableHoursSlice.actions;

// export default availableHoursSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

const availableHoursSlice = createSlice({
  name: "time",
  initialState: {
    selectedHour: null,
    timeDate: null,
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
