// bookingUtils.js

import axios from "axios";

export async function fetchAndUpdate(
  selectedDate,
  values,
  dispatch,
  hours,
  booked,
  setBooked,
  setAvailable,
  findAvailableHours,
  setSubmitted,
  setError
) {
  try {
    await submitFormData(values, dispatch, setSubmitted, setError);
    const response = await axios.get(
      `http://localhost:3001/data/${selectedDate.toDateString()}`
    );
    await dispatch(setBooked(response.data));
    const updatedAvailable = findAvailableHours(hours, booked);
    await dispatch(setAvailable(updatedAvailable));
  } catch (error) {
    console.error(error);
  }
}

async function submitFormData(values, dispatch, setSubmitted, setError) {
  try {
    const response = await axios.post(
      "http://localhost:3001/submit-form",
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    console.log(data.message);

    // dispatch the setSubmitted action only if the server responds with a success message
    if (data.message === "Data added successfully") {
      dispatch(setSubmitted());
    } else {
      // display an error message to the user
      setError("An error occurred while submitting the form.");
    }
  } catch (error) {
    console.error(error);
    setError("An error occurred while submitting the form.");
  }
}
