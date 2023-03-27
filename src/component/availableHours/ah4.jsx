import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedHour } from "../redux/slice/timeSlice";
import "./ah4.css";

function AvailableHours() {
  const selectedHour = useSelector((state) => state.time.selectedHour);
  const available = useSelector((state) => state.time.available);

  const dispatch = useDispatch();

  const handleClick = (hour) => {
    dispatch(setSelectedHour(hour));
  };

  const hoursButton = available.map((hour) => (
    <div className="hours" key={hour}>
      <button
        className={`hour ${selectedHour === hour ? "selected" : ""}`}
        onClick={() => handleClick(hour)}
      >
        {hour}
      </button>
    </div>
  ));

  return <div className="hours-section">{hoursButton}</div>;
}

export default AvailableHours;
