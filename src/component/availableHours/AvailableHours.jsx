import React, { useState } from "react";

function AvailableHours(props) {
  let [selectedHour, setSelectedHour] = useState();
  let hours = props.hours;

  let handleClick = (hour) => {
    setSelectedHour(hour);
  };

  let hoursButton = hours.map((hour) => {
    return (
      <div>
        <button
          key={hour}
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
      {selectedHour && <p>Selected Hour:{selectedHour} </p>}
      <button onClick={() => {}}>Book Me</button>
    </div>
  );
}

export default AvailableHours;
