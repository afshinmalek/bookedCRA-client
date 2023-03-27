import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";

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
    setValue: produce((state, action) => {
      const { field, value } = action.payload;
      state.values[field] = value;
    }),
    setSubmitting: produce((state) => {
      state.error = null;
      state.submitting = true;
      state.submitted = false;
    }),
    setSubmitted: produce((state) => {
      state.submitting = false;
      state.submitted = true;
      state.error = null;
    }),
    setError: produce((state, action) => {
      state.submitting = false;
      state.submitted = false;
      state.error = action.payload;
    }),
    reset: produce((state) => {
      state.values = {
        name: "",
        email: "",
      };
      state.submitting = false;
      state.submitted = false;
      state.error = null;
    }),
  },
});

export const { setValue, setSubmitting, setSubmitted, setError, reset } =
  formSlice.actions;
export default formSlice.reducer;
