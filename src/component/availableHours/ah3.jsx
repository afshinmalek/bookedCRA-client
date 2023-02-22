import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedHour } from "../redux/slice/bbbSlice";

function AvailableHours() {
  const [hours, setHours] = useState([9, 10, 11, 12, 1, 2, 3, 4, 5]);
  //const [selectedHour, setSelectedHour] = useState();

  const selectedHour = useSelector((state) => state.time.selectedHour);

  //const hours = useSelector((state) => state.availableHours.hours);
  const dispatch = useDispatch();

  //const [hours, setHours] = useState([9, 10, 11, 12, 1, 2, 3, 4, 5]);

  const handleClick = (hour) => {
    // setSelectedHour(hour);

    dispatch(setSelectedHour(hour));
  };

  // const fetchHours = async () => {
  //   const response = await fetch("/api/hours");
  //   const data = await response.json();
  //   setHours(data);
  // };

  // useEffect(() => {
  //   fetchHours();
  // }, []);

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
