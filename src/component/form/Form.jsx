import React, { useRef, useEffect } from "react";
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
import { setBooked } from "../redux/slice/timeSlice";
import { setAvailable } from "../redux/slice/timeSlice";

//import { fetchAndUpdate } from "./formUtil";
import checkValues from "./formUtilVal";
import findAvailableHours from "../availableHours/ahhelper";

const MyForm = () => {
  const inputRefs = useRef([]);
  const values = useSelector((state) => state.form.values);
  const submitting = useSelector((state) => state.form.submitting);
  const submitted = useSelector((state) => state.form.submitted);
  const error = useSelector((state) => state.form.error);
  const dispatch = useDispatch();
  const selectedHour = useSelector((state) => state.time.selectedHour);
  const selectedDate =
    useSelector((state) => state.date.selectedDate) || new Date();
  const hours = useSelector((state) => state.time.hours);
  const booked = useSelector((state) => state.time.booked);
  console.log("************** form.jsx ********* selectedDate: ", selectedDate);
  let date = new Date(selectedDate);
  let rDate = date.toDateString();

  const allValues = {
    ...values,
    time: selectedHour,
    date: rDate,
  };
  console.log("************** form.jsx ********* allValues: ", allValues);
  /***************************************************/
  async function submitFormData(values) {
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
      if (data.message === "Data added successfully") {
        dispatch(setSubmitted());
        return;
      } else if (
        data.message === "Combination of date and time already exists"
      ) {
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

  /***************************************************/
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setSubmitting());
    submitFormData(allValues);

    // const hasValidValues = await checkValues(
    //   event,
    //   values,
    //   dispatch,
    //   inputRefs
    // );
    // if (!hasValidValues || submitting) {
    //   return;
    // }
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
  // useEffect(() => {
  //   console.log("*************  run first ********************");
  // }, [submitting]);

  useEffect(() => {
    console.log("*************  run second ********************");

    console.log("****************** selectedDate: " + selectedDate);
    const fetchBooked = async () => {
      try {
        const timestamp = Math.floor(selectedDate?.getTime());

        const response = await axios.get(
          `http://localhost:3001/data/${timestamp}`
        );
        dispatch(setBooked(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooked();
  }, [submitted, dispatch]);

  useEffect(() => {
    console.log("*************  run third ********************");

    const updatedAvailable = findAvailableHours(hours, booked);
    dispatch(setAvailable(updatedAvailable));
  }, [booked, dispatch, hours]);

  /**************************************************/
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setValue({ field: name, value }));
  };

  const handleReset = () => {
    dispatch(reset());
  };

  const formClassName = submitting ? "form-input submitting" : "form-input";

  return (
    <form className={formClassName} onSubmit={handleSubmit}>
      <div className="inputs">
        <div className="no-cursor">
          <input
            type="text"
            name="date"
            placeholder="date"
            value={rDate ?? undefined}
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
            required
            ref={(el) => (inputRefs.current[0] = el)}
          />
          <label>Name</label>
        </div>
        <div className="groupInput">
          <input
            name="email"
            value={values.email ?? undefined}
            onChange={handleChange}
            autoComplete="off"
            required
            minLength={1}
            ref={(el) => (inputRefs.current[1] = el)}
          />
          <label>Email</label>
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
