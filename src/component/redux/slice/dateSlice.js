// import { createSlice } from "@reduxjs/toolkit";

// const dateSlice = createSlice({
//   name: "date",
//   initialState: {
//     selectedDate: null,
//     dayOne: null,
//     dayTwo: null,
//   },
//   reducers: {
//     setSelectedDate: (state, action) => {
//       state.selectedDate = action.payload;
//     },
//     setDayOne: (state, action) => {
//       state.dayOne = action.payload;
//     },
//     setDayTwo: (state, action) => {
//       state.dayTwo = action.payload;
//     },
//   },
// });

// export const { setSelectedDate, setDayOne, setDayTwo } = dateSlice.actions;
// export default dateSlice.reducer;

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
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import produce from "immer";

// export const setSelectedDate = createAsyncThunk(
//   "date/setSelectedDate",
//   async (selectedDate, thunkAPI) => {
//     return selectedDate;
//   }
// );

// const dateSlice = createSlice({
//   name: "date",
//   initialState: {
//     selectedDate: null,
//     dayOne: null,
//     dayTwo: null,
//   },
//   reducers: {
//     setDayOne: produce((state, action) => {
//       state.dayOne = action.payload;
//     }),
//     setDayTwo: produce((state, action) => {
//       state.dayTwo = action.payload;
//     }),
//   },
//   extraReducers: (builder) => {
//     builder.addCase(setSelectedDate.fulfilled, (state, action) => {
//       state.selectedDate = action.payload;
//     });
//   },
// });
// export const { setSelectedDate, setDayOne, setDayTwo } = dateSlice.actions;

// export default dateSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import produce from "immer";

// export const setSelectedDate = createAsyncThunk(
//   "date/setSelectedDate",
//   async (selectedDate, thunkAPI) => {
//     return selectedDate.toISOString();
//   }
// );
// setSelectedDate.fulfilled.toString = () => "date/setSelectedDate/fulfilled";

// const dateSlice = createSlice({
//   name: "date",
//   initialState: {
//     selectedDate: null,
//     dayOne: null,
//     dayTwo: null,
//   },
//   reducers: {
//     setDayOne: produce((state, action) => {
//       state.dayOne = action.payload;
//     }),
//     setDayTwo: produce((state, action) => {
//       state.dayTwo = action.payload;
//     }),
//   },
//   extraReducers: (builder) => {
//     builder.addCase(setSelectedDate.fulfilled, (state, action) => {
//       delete action.meta.arg;

//       state.selectedDate = action.payload;
//     });
//   },
// });

// export default dateSlice.reducer;
