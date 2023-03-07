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

  // let hours = [9, 10, 11, 12, 1, 2, 3, 4, 5];
  // let booked = [{ start: 10 }, { start: 1 }, { start: 3 }];

  // let available = findAvailableHours(hours, booked);
  // hours={available}
  return (
    <div className="container">
      <Calendar value={selectedDate} onChange={handleDateChange} />
      <section>
        <div>Selected date: {selectedDate && selectedDate.toDateString()}</div>
        <AvailableHours />
        <MyForm></MyForm>
      </section>
    </div>
  );
}
export default MyCalendar;
