import axios from "axios";
import { useEffect } from "react";
import { setBooked, setAvailable } from "../redux/slice/timeSlice";
import findAvailableHours from "../availableHours/ahhelper";

const useFetchAndUpdate = (selectedDate, booked, dispatch, hours) => {
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
  }, [selectedDate, booked, dispatch, hours]);
};
