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

function AvailableHours({ propDate }) {
  const selectedDate = useSelector((state) => state.date.selectedDate);
  const selectedHour = useSelector((state) => state.time.selectedHour);
  const booked = useSelector((state) => state.time.booked);
  const available = useSelector((state) => state.time.available);
  const hours = useSelector((state) => state.time.hours);
  const dispatch = useDispatch();

  const handleClick = (hour) => {
    dispatch(setSelectedHour(hour));
  };

  useEffect(() => {
    const fetchBooked = async () => {
      try {
        // Fetch booked data for the selected date and the next two days
        const datesToFetch = [selectedDate];
        for (let i = 1; i < 3; i++) {
          const nextDay = new Date(
            selectedDate.getTime() + i * 24 * 60 * 60 * 1000
          );
          datesToFetch.push(nextDay);
        }

        const requests = datesToFetch.map((date) => {
          return axios.get(`http://localhost:3001/data/${date.toDateString()}`);
        });

        const responses = await Promise.all(requests);
        const data = responses.map((response) => response.data);

        // Set booked data for all three days in Redux
        dispatch(setBooked(data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooked();
  }, [selectedDate, dispatch]);

  const hoursButtons = [];
  for (let i = 0; i < 3; i++) {
    const date = new Date(selectedDate.getTime() + i * 24 * 60 * 60 * 1000);
    const bookedData = booked.find((data) => data.date === date.toDateString());
    const availableHours = available[i] || [];
    const dateUI = (
      <div key={date.toDateString()}>
        <div>{date.toDateString()}</div>
        <div className="hours-section">
          {availableHours.map((hour) => (
            <div className="hours" key={hour.time}>
              <button
                className={`hour ${
                  selectedHour === hour.time ? "selected" : ""
                }`}
                onClick={() => handleClick(hour.time)}
                disabled={bookedData?.times.includes(hour.time)}
              >
                {hour.time}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
    hoursButtons.push(dateUI);
  }

  return <div>{hoursButtons}</div>;
}
export default AvailableHours;
