import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  setSelectedHour,
  setBooked,
  setAvailable,
} from "../redux/slice/timeSlice";
import findAvailableHours from "./availableHoursHelper";

function AvailableHours() {
  let selectedDate = useSelector((state) => state.date.selectedDate);
  const selectedHour = useSelector((state) => state.time.selectedHour);
  const booked = useSelector((state) => state.time.booked);
  const available = useSelector((state) => state.time.available);
  const hours = useSelector((state) => state.time.hours);
  const dispatch = useDispatch();

  const handleClick = (hour) => {
    dispatch(setSelectedHour(hour));
  };

  function refresh() {
    async function fetchBooked() {
      try {
        const response = await axios.get(
          `http://localhost:3001/data/${selectedDate.toDateString()}`
        );
        dispatch(setBooked(response.data));
      } catch (error) {
        console.error(error);
      }
    }

    fetchBooked();
    const updatedAvailable = findAvailableHours(hours, booked);
    dispatch(setAvailable(updatedAvailable));
  }

  useEffect(() => {
    const fetchBooked = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/data/${selectedDate.toDateString()}`
        );
        dispatch(setBooked(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooked();
  }, [selectedDate, dispatch]);

  useEffect(() => {
    const updatedAvailable = findAvailableHours(hours, booked);
    dispatch(setAvailable(updatedAvailable));
  }, [selectedDate, booked, dispatch, hours]);

  const hoursButton = available.map((hour) => (
    <div key={hour}>
      <button onClick={() => handleClick(hour)}>{hour}</button>
    </div>
  ));

  return (
    <div>
      <button className="icon" onClick={refresh}>
        refresh
      </button>
      {hoursButton}
      {selectedHour && <p>Selected Hour: {selectedHour}</p>}
    </div>
  );
}

export default AvailableHours;
