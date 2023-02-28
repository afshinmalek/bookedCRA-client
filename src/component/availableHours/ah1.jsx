import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedHour } from "../redux/slice/timeSlice";

function AvailableHours({ hours }) {
  const selectedHour = useSelector(
    (state) => state.availableHours.selectedHour
  );
  const dispatch = useDispatch();

  const handleClick = (hour) => {
    dispatch(setSelectedHour(hour));
  };

  const hoursButton = hours.map((hour) => {
    return (
      <div key={hour}>
        <button
          onClick={() => {
            handleClick(hour);
          }}
        >
          {hour}
        </button>
      </div>
    );
  });

  return (
    <div>
      {hoursButton}
      {selectedHour && <p>Selected Hour: {selectedHour}</p>}
    </div>
  );
}

export default AvailableHours;
