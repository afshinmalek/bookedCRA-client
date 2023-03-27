import React from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setSelectedDate } from "./redux/slice/dateSlice";
import { setBooked, setAvailable } from "./redux/slice/timeSlice";
import Calendar from "react-calendar";
import "./cal.css";
import findAvailableHours from "./availableHours/ahhelper";
import AvailableHours from "./availableHours/ah4";
import MyForm from "./form/Form";
import "./calendar.css";

function MyCalendar() {
  const selectedDate = useSelector((state) => state.date.selectedDate);
  const booked = useSelector((state) => state.time.booked);
  const hours = useSelector((state) => state.time.hours);
  const dispatch = useDispatch();

  const fetchBooked = async (date) => {
    console.log("************* oldC.jsx first call /get /setBooked *********");
    try {
      const timestamp = Math.floor(date || selectedDate);

      const response = await axios.get(
        `http://localhost:3001/data/${timestamp}`
      );
      dispatch(setBooked(response.data));

      const updatedAvailable = findAvailableHours(hours, booked);
      dispatch(setAvailable(updatedAvailable));
    } catch (error) {
      console.error(error);
    }
  };

  function handleDateChange(date) {
    console.log("********** date ***********", date);
    dispatch(setSelectedDate(date));
    fetchBooked(date);
  }

  return (
    <div className="container">
      {/*<Calendar value={selectedDate} onChange={handleDateChange} />*/}
      <Calendar value={selectedDate} onChange={handleDateChange} />

      <section>
        <AvailableHours />
        <MyForm></MyForm>
      </section>
    </div>
  );
}
export default MyCalendar;
