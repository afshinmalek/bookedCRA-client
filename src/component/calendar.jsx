import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import AvailableHours from "./availableHours/AvailableHours";

function MyCalendar() {
  const [value, setValue] = useState(new Date());
  let hours = [9, 10, 11, 12, 1, 2, 3, 4, 5];

  return (
    <div>
      <Calendar onChange={setValue} value={value} view={"month"} />
      <h4>Selected:{value.toDateString()}</h4>
      <AvailableHours hours={hours}></AvailableHours>
    </div>
  );
}
export default MyCalendar;
