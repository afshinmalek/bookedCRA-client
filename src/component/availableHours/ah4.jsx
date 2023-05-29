import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedHour } from "../redux/slice/timeSlice";
import { setSelectedDate } from "../redux/slice/dateSlice";

import "./ah4.css";

function AvailableHours() {
  const selectedHour = useSelector((state) => state.time.selectedHour);
  const available = useSelector((state) => state.time.available);
  const selectedDate = useSelector((state) => state.date.selectedDate);

  const dispatch = useDispatch();

  const handleClick = ({ date, time }) => {
    if (date && !(typeof date === "string")) {
      date = date.toDateString();
    }
    dispatch(setSelectedHour(time));
    dispatch(setSelectedDate(selectedDate));
  };

  const hoursButton = available.map(({ selectedDate, time }) => (
    <div className="hours" key={time}>
      <button
        className={`hour ${selectedHour === time ? "selected" : ""}`}
        onClick={() => handleClick({ selectedDate, time })}
      >
        {time}:00 - {time + 1}:00 {time <= 11 && time >= 9 ? " AM" : " PM"}
      </button>
    </div>
  ));

  return <div className="hours-section">{hoursButton}</div>;
}

export default AvailableHours;
