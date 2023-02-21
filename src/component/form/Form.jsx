import axios from "axios";
import React from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  setValue,
  setSubmitting,
  setSubmitted,
  setError,
  reset,
} from "../redux/slice/formSlice";

const submitFormData = (values) => {
  axios
    .post("http://localhost:3001/submit-form", values, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response);
      // handle success
    })
    .catch((error) => {
      console.log(error);
      // handle error
    });
};

const MyForm = () => {
  const values = useSelector((state) => state.form.values);
  const submitting = useSelector((state) => state.form.submitting);
  const submitted = useSelector((state) => state.form.submitted);
  const error = useSelector((state) => state.form.error);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setSubmitting());

    if (submitting) {
      return;
    }

    try {
      // Submit form data
      await submitFormData(values);
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
