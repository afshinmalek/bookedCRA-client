import React from "react";

function AvailableHours(props) {
  let hours = props.hours;

  return hours.map((hour) => {
    return <button>{hour}</button>;
  });
}

export default AvailableHours;
