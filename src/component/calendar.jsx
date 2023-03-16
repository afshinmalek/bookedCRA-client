import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDate } from "./redux/slice/dateSlice";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AvailableHours from "./availableHours/AvailableHours";
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
      <div>Selected date: {selectedDate && selectedDate?.toDateString()}</div>
      <AvailableHours />
      <MyForm></MyForm>
    </div>
  );
}
export default MyCalendar;
