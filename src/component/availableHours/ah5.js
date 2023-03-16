import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  setSelectedHour,
  setBooked,
  setAvailable,
} from "../redux/slice/timeSlice";
import { setSelectedDate } from "../redux/slice/dateSlice";
import findAvailableHours from "./ahhelper";
import "./ah4.css";

function AvailableHours() {
  const selectedDate = useSelector((state) => state.date.selectedDate);
  const selectedHour = useSelector((state) => state.time.selectedHour);
  const booked = useSelector((state) => state.time.booked);
  const available = useSelector((state) => state.time.available);
  const hours = useSelector((state) => state.time.hours);
  const dispatch = useDispatch();

  const handleClick = (hourObj) => {
    dispatch(setSelectedHour(hourObj.hour));
    dispatch(setSelectedDate(hourObj.date));
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
    console.log("*************booked: ", booked);
    const updatedAvailable = findAvailableHours(hours, booked);
    dispatch(setAvailable(updatedAvailable));
  }, [selectedDate, booked, dispatch, hours]);

  const dates = [selectedDate];
  for (let i = 1; i < 3; i++) {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate?.getDate() + i);
    dates.push(nextDay);
  }

  const hoursButtons = dates.map((date) => {
    const buttons = available.map((hour) => {
      const hourObj = { hour: hour, date: date };
      const isBooked = booked.some((booking) => {
        return booking.time === hour && booking.date === date;
      });
      return (
        <div className="hours" key={`${hour}-${date}`}>
          <button
            className={`hour${isBooked ? " booked" : ""}`}
            onClick={() => handleClick(hourObj)}
          >
            {hour}
          </button>
        </div>
      );
    });
    return (
      <div className="hours-col" key={date}>
        <h3>{date?.toDateString()}</h3>
        {date && <div className="hours-section">{buttons}</div>}
      </div>
    );
  });

  return hoursButtons;
}

export default AvailableHours;
