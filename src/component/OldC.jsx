import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDate } from "./redux/slice/dateSlice";
import Calendar from "react-calendar";
import "./cal.css";
//import findAvailableHours from "./availableHours/availableHoursHelper";
import AvailableHours from "./availableHours/ah4";
import MyForm from "./form/Form";
import "./calendar.css";

function MyCalendar() {
  const selectedDate = useSelector((state) => state.date.selectedDate);
  const dispatch = useDispatch();

  const handleDateChange = (date) => {
    dispatch(setSelectedDate(date));
  };

  return (
    <div className="container">
      <Calendar value={selectedDate} onChange={handleDateChange} />
      <section>
        <AvailableHours />

        <MyForm></MyForm>
      </section>
    </div>
  );
}
export default MyCalendar;
