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
    const timestamp = Math.floor(selectedDate?.getTime());

    const response = await axios.get(`http://localhost:3001/data/${timestamp}`);
    console.log("******** formUtil ******** booked **** ", response.data);
    dispatch(setBooked(response.data));
    const updatedAvailable = findAvailableHours(hours, booked);

    dispatch(setAvailable(updatedAvailable));
    console.log(
      "******** formUtil ******** updatedAvailable **** ",
      updatedAvailable
    );
    console.log("************* formUtil.js ********** end of fetch&update");
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
    console.log(
      "************* formUtil*********data i submitted *********",
      data.message
    );

    // dispatch the setSubmitted action only if the server responds with a success message
    if (data.message === "Data added successfully") {
      dispatch(setSubmitted());
      return;
    } else if (data.message === "Combination of date and time already exists") {
      dispatch(setError("That time is already booked"));
      return;
    } else {
      // display an error message to the user
      dispatch(setError(data.message));
      return;
    }
  } catch (error) {
    console.error(error);
    dispatch(setError("An error occurred while submitting the form."));
  }
}
