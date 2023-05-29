import React, { useEffect } from "react";
import axios from "axios";
import "./form.css";

import { useSelector, useDispatch } from "react-redux";
import {
  setValue,
  setSubmitting,
  setSubmitted,
  setError,
  reset,
} from "../redux/slice/formSlice";
import { setBooked, setSelectedHour } from "../redux/slice/timeSlice";

import { setAvailable } from "../redux/slice/timeSlice";

import findAvailableHours from "../availableHours/ahhelper";
import * as dotenv from "dotenv";
dotenv.config();

const MyForm = () => {
  let appUrl = process.env.REACT_APP_APP_URL;
  console.log("************** ENV ********* ENV: ", appUrl);

  const values = useSelector((state) => state.form.values);
  const submitting = useSelector((state) => state.form.submitting);
  const submitted = useSelector((state) => state.form.submitted);
  const error = useSelector((state) => state.form.error);
  const dispatch = useDispatch();
  const selectedHour = useSelector((state) => state.time.selectedHour);
  let selectedDate =
    useSelector((state) => state.date.selectedDate) || new Date();

  const hours = useSelector((state) => state.time.hours);
  const booked = useSelector((state) => state.time.booked);

  console.log("************** form.jsx ********* selectedDate: ", selectedDate);
  selectedDate = new Date(selectedDate).toDateString();
  const allValues = {
    ...values,
    time: selectedHour,
    date: selectedDate,
  };
  console.log("************** form.jsx ********* allValues: ", allValues);
  /***************************************************/

  const fetchBooked = async () => {
    try {
      const response = await axios.get(`${appUrl}/data/${selectedDate}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(setBooked(response.data));
    } catch (error) {
      console.error(error);
    }
  };
  let myPath = `${appUrl}/submit-form`;
  console.log("path**********************************", myPath);
  async function submitFormData(values) {
    try {
      const response = await axios.post(myPath, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      const actions = {
        "Data added successfully": () => {
          dispatch(setSubmitted());
          fetchBooked();
        },
        "Combination of date and time already exists": () => {
          dispatch(setError("That time is already booked"));
        },
        default: () => {
          dispatch(setError(data.message));
        },
      };

      const action = actions[data.message] || actions.default;
      action();
    } catch (error) {
      console.error(error);
      dispatch(setError("An error occurred while submitting the form."));
    }
  }

  /***************************************************/
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setSubmitting());
    submitFormData(allValues);

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
  };

  /*********************************************/

  useEffect(() => {
    console.log(
      "****** runs once *******  run second  /get / setBooked ********"
    );

    fetchBooked();
    console.log("***** updatedFetched2 *******", booked);
  }, []);

  useEffect(() => {
    let availableHours = findAvailableHours({ hours, booked }, selectedDate);
    dispatch(setAvailable(availableHours));
    console.log(
      "**************** FindAvailableHours **************",
      availableHours
    );
  }, [booked]);

  /**************************************************/
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setValue({ field: name, value }));
  };

  const handleReset = () => {
    dispatch(reset());
    dispatch(setSelectedHour(""));
  };

  console.log("submitted: ", submitted);
  console.log("submitting: ", submitting);
  const formClassName = submitting ? "form-input submitting" : "form-input";

  return (
    <form className={formClassName} onSubmit={handleSubmit}>
      <div className="inputs">
        <div className="no-cursor">
          <input
            type="text"
            name="date"
            placeholder="date"
            value={selectedDate ?? undefined}
            readOnly
          />
          <label id="date">Date</label>
        </div>

        <div className="no-cursor">
          <input
            type="text"
            name="time"
            placeholder="time"
            value={selectedHour ?? undefined}
            readOnly
          />
          <label id={selectedHour !== null ? "time" : ""}>Time</label>
        </div>
        <div className="groupInput">
          <input
            type="text"
            name="name"
            value={values.name ?? undefined}
            onChange={handleChange}
            autoComplete="off"
            placeholder=" "
          />
          <label id="name">Name</label>
        </div>
        <div className="groupInput">
          <input
            type="text"
            name="email"
            value={values.email ?? undefined}
            onChange={handleChange}
            autoComplete="off"
            placeholder=" "
          />
          <label id="email">Email</label>
        </div>
      </div>
      <div className="submit">
        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </button>

        <button type="button" onClick={handleReset}>
          Reset
        </button>
        {error ? (
          <div className="err">{error}</div>
        ) : (
          submitted &&
          !error &&
          !submitting && (
            <div className="success">Form submitted successfully!</div>
          )
        )}
      </div>
    </form>
  );
};

export default MyForm;
