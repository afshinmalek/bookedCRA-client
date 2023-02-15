import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

function MyCalendar() {
  const [value, setValue] = useState(new Date(1986, 6, 1));

  return (
    <div>
      <Calendar onChange={setValue} value={value} view={"month"} />
      <h4>Selected:{value.toDateString()}</h4>
    </div>
  );
}
export default MyCalendar;
