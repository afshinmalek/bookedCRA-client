import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDate } from "./calendarSlice";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import findAvailableHours from "./availableHours/availableHoursHelper";
import AvailableHours from "./availableHours/AvailableHours";
import MyForm from "./form/Form";
import SampleButton from "./SampleButton";

function MyCalendar() {
  const selectedDate = useSelector((state) => state.calendar.selectedDate);
  const dispatch = useDispatch();

  const handleDateChange = (date) => {
    dispatch(setSelectedDate(date));
  };

  let hours = [9, 10, 11, 12, 1, 2, 3, 4, 5];
  let booked = [{ start: 10 }, { start: 1 }, { start: 3 }];

  let available = findAvailableHours(hours, booked);

  return (
    <div>
      <SampleButton />
      <Calendar value={selectedDate} onChange={handleDateChange} />
      <div>Selected date: {selectedDate && selectedDate.toDateString()}</div>
      <AvailableHours hours={available}></AvailableHours>
      <MyForm></MyForm>
    </div>
  );
}
export default MyCalendar;
