import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  setSelectedHour,
  setBooked,
  setAvailable,
} from "../redux/slice/timeSlice";

import findAvailableHours from "./ahhelper";
import "./ah4.css";

function AvailableHours() {
  let selectedDate = useSelector((state) => state.date.selectedDate);
  const selectedHour = useSelector((state) => state.time.selectedHour);
  const booked = useSelector((state) => state.time.booked);
  const available = useSelector((state) => state.time.available);
  const hours = useSelector((state) => state.time.hours);
  const dispatch = useDispatch();

  //let myDate = propDate ? propDate : selectedDate;
  //let myDate = propDate !== undefined ? propDate : selectedDate;

  const handleClick = (hour) => {
    dispatch(setSelectedHour(hour));
  };

  useEffect(() => {
    console.log("****************** selectedDate: " + selectedDate);
    const fetchBooked = async () => {
      try {
        const timestamp = Math.floor(selectedDate?.getTime());

        const response = await axios.get(
          `http://localhost:3001/data/${timestamp}`
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
  }, [booked, dispatch, hours]);

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
