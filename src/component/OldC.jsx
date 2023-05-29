import React from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setSelectedDate } from "./redux/slice/dateSlice";
import { setBooked, setAvailable } from "./redux/slice/timeSlice";
import Calendar from "react-calendar";
import "./cal.css";
import AvailableHours from "./availableHours/ah4";
import MyForm from "./form/Form";
import "./calendar.css";
import * as dotenv from "dotenv";
import findAvailableHours from "./availableHours/ahhelper";
dotenv.config();

let appUrl = process.env.REACT_APP_APP_URL;

function MyCalendar() {
  const selectedDate = useSelector((state) => state.date.selectedDate);
  const booked = useSelector((state) => state.time.booked);
  const hours = useSelector((state) => state.time.hours);
  const dispatch = useDispatch();

  const fetchBooked = async (date) => {
    console.log("************* oldC.jsx first call /get /setBooked *********");
    try {
      const response = await axios.get(`${appUrl}/data/${date}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(setBooked(response.data));
      let updatedHours = findAvailableHours({ hours, booked }, selectedDate);

      dispatch(setAvailable(updatedHours));
    } catch (error) {
      console.error(error);
    }
  };

  function handleDateChange(date) {
    if (date && !(typeof date === "string")) {
      date = date.toDateString();
    }
    console.log("********** date ***********", date);
    dispatch(setSelectedDate(date));
    fetchBooked(date);
  }

  return (
    <div className="container">
      <Calendar value={selectedDate} onChange={handleDateChange} />

      <section className="hour-form">
        <AvailableHours />
        <MyForm></MyForm>
      </section>
    </div>
  );
}
export default MyCalendar;
