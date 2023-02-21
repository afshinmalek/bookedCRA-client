import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import findAvailableHours from "./availableHours/availableHoursHelper";
import AvailableHours from "./availableHours/AvailableHours";
import MyForm from "./form/Form";
import SendR from "./SendR";
import SampleButton from "./SampleButton";

function MyCalendar() {
  const [value, setValue] = useState(new Date());
  let hours = [9, 10, 11, 12, 1, 2, 3, 4, 5];
  let booked = [{ start: 10 }, { start: 1 }, { start: 3 }];

  let available = findAvailableHours(hours, booked);

  return (
    <div>
      <SampleButton />
      <Calendar onChange={setValue} value={value} view={"month"} />
      <SendR></SendR>
      <h4>Selected:{value.toDateString()}</h4>
      <AvailableHours hours={available}></AvailableHours>
      <MyForm></MyForm>
    </div>
  );
}
export default MyCalendar;
