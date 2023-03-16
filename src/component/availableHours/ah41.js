import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  setSelectedHour,
  setTimeDate,
  setBooked,
  setBookedOne,
  setBookedTwo,
  setAvailable,
  setAvailableOne,
  setAvailableTwo,
} from "../redux/slice/timeSlice";
import {
  setDayOne,
  setDayTwo,
  setSelectedDate,
} from "../redux/slice/dateSlice";
import findAvailableHours from "./ahhelper";
import "./ah4.css";

function AvailableHours() {
  let selectedDate = useSelector((state) => state.date.selectedDate);
  let dayOne = useSelector((state) => state.date.dayOne);
  let dayTwo = useSelector((state) => state.date.dayTwo);

  const selectedHour = useSelector((state) => state.time.selectedHour);
  const timeDate = useSelector((state) => state.time.timeDate);

  const booked = useSelector((state) => state.time.booked);
  const bookedOne = useSelector((state) => state.time.bookedOne);
  const bookedTwo = useSelector((state) => state.time.bookedTwo);

  const available = useSelector((state) => state.time.available);
  const availableOne = useSelector((state) => state.time.availableOne);
  const availableTwo = useSelector((state) => state.time.availableTwo);

  const hours = useSelector((state) => state.time.hours);

  const dispatch = useDispatch();

  //let myDate = propDate ? propDate : selectedDate;
  //let myDate = propDate !== undefined ? propDate : selectedDate;

  const handleClick = (td) => {
    dispatch(setTimeDate(td));
  };

  useEffect(() => {
    // set initial values for dayOne and dayTwo
    let date = new Date(selectedDate);
    let day = date.getDate();
    date.setDate(day + 1);
    dispatch(setDayOne(date));
    date.setDate(day + 2);
    dispatch(setDayTwo(date));

    const fetchBooked = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/data/${selectedDate.toDateString()}`
        );
        dispatch(setBooked(response.data));

        const responseOne = await axios.get(
          `http://localhost:3001/data/${dayOne.toDateString()}`
        );
        dispatch(setBookedOne(responseOne.data));

        const responseTwo = await axios.get(
          `http://localhost:3001/data/${dayTwo.toDateString()}`
        );
        dispatch(setBookedTwo(responseTwo.data));
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

  useEffect(() => {
    const updatedAvailableOne = findAvailableHours(hours, bookedOne);
    dispatch(setAvailableOne(updatedAvailableOne));
  }, [dayOne, bookedOne, dispatch, hours]);

  useEffect(() => {
    const updatedAvailableTwo = findAvailableHours(hours, bookedTwo);
    dispatch(setAvailableTwo(updatedAvailableTwo));
  }, [dayTwo, bookedTwo, dispatch, hours]);

  const hoursButton = available.map((td) => (
    <div className="hours" key={String(td.time) + String(td.date)}>
      <button className="hour" onClick={() => handleClick(td)}>
        {td.time}
      </button>
    </div>
  ));

  const hoursButtonOne = availableOne.map((td) => (
    <div className="hours" key={String(td.time) + String(td.date)}>
      <button className="hour" onClick={() => handleClick(td)}>
        {td.time}
      </button>
    </div>
  ));

  const hoursButtonTwo = availableTwo.map((td) => (
    <div className="hours" key={String(td.time) + String(td.date)}>
      <button className="hour" onClick={() => handleClick(td)}>
        {td.time}
      </button>
    </div>
  ));

  return (
    <div>
      <div className="hours-section">{hoursButton}</div>;
      <div className="hours-section">{hoursButtonOne}</div>;
      <div className="hours-section">{hoursButtonTwo}</div>;
    </div>
  );
}

export default AvailableHours;
