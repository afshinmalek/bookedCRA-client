import React from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  setValue,
  setSubmitting,
  setSubmitted,
  setError,
  reset,
} from "../redux/slice/formSlice";
import { setBooked } from "../redux/slice/timeSlice";
import { setAvailable } from "../redux/slice/timeSlice";

import { fetchAndUpdate } from "./formUtil";
import findAvailableHours from "../availableHours/ahhelper";

const MyForm = () => {
  const values = useSelector((state) => state.form.values);
  const submitting = useSelector((state) => state.form.submitting);
  const submitted = useSelector((state) => state.form.submitted);
  const error = useSelector((state) => state.form.error);
  const dispatch = useDispatch();
  const selectedHour = useSelector((state) => state.time.selectedHour);
  const selectedDate = useSelector((state) => state.date.selectedDate);
  const hours = useSelector((state) => state.time.hours);
  const booked = useSelector((state) => state.time.booked);

  let date = new Date(selectedDate);
  let rDate = date.toDateString();

  const allValues = {
    ...values,
    time: selectedHour,
    date: rDate,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setSubmitting());

    if (submitting) {
      return;
    }

    if (!navigator.onLine) {
      dispatch(
        setError(
          "You are currently offline. Please connect to the internet to submit the form."
        )
      );
      return;
    }

    try {
      await fetchAndUpdate(
        selectedDate,
        allValues,
        dispatch,
        hours,
        booked,
        setBooked,
        setAvailable,
        findAvailableHours,
        setSubmitted
      );

      dispatch(setSubmitted());
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setValue({ field: name, value }));
  };

  const handleReset = () => {
    dispatch(reset());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
      />

      {error && <div>{error}</div>}
      <button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit"}
      </button>
      {submitted && <div>Form submitted successfully!</div>}
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
};

export default MyForm;
