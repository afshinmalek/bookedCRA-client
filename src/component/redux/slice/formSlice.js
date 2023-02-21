import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    values: {
      name: "",
      email: "",
    },
    submitting: false,
    submitted: false,
    error: null,
  },
  reducers: {
    setValue: (state, action) => {
      const { field, value } = action.payload;
      state.values[field] = value;
    },
    setSubmitting: (state) => {
      state.submitting = true;
    },
    setSubmitted: (state) => {
      state.submitting = false;
      state.submitted = true;
    },
    setError: (state, action) => {
      state.submitting = false;
      state.error = action.payload;
    },
    reset: (state) => {
      state.values = {
        name: "",
        email: "",
      };
      state.submitting = false;
      state.submitted = false;
      state.error = null;
    },
  },
});

export const { setValue, setSubmitting, setSubmitted, setError, reset } =
  formSlice.actions;
export default formSlice.reducer;
