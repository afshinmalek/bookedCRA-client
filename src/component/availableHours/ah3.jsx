import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedHour,
  setBooked,
  setAvailable,
} from "../redux/slice/timeSlice";
import findAvailableHours from "./availableHoursHelper";

function AvailableHours() {
  const selectedHour = useSelector((state) => state.time.selectedHour);
  const booked = useSelector((state) => state.time.booked);
  const available = useSelector((state) => state.time.available);

  const hours = useSelector((state) => state.time.hours);
  const dispatch = useDispatch();

  const handleClick = (hour) => {
    dispatch(setSelectedHour(hour));
  };

  const fetchBooked = async () => {
    const response = await fetch("http://localhost:3001/data");
    const booked = await response.json();
    console.log("booked: " + booked);
    dispatch(setBooked(booked));
  };

  useEffect(() => {
    fetchBooked();
  }, [booked]);

  useEffect(() => {
    const available = findAvailableHours(hours, booked);
    dispatch(setAvailable(available));
  }, [hours, booked, dispatch]);

  const hoursButton = available.map((hour) => {
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
