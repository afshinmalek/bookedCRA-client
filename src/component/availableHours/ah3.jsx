import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedHour } from "../redux/slice/timeSlice";

function AvailableHours() {
  const selectedHour = useSelector((state) => state.time.selectedHour);
  const hours = useSelector((state) => state.time.hours);
  const dispatch = useDispatch();

  const handleClick = (hour) => {
    dispatch(setSelectedHour(hour));
  };

  const fetchHours = async () => {
    const response = await fetch("http://localhost:3001/data");
    const data = await response.json();
    setHours(data);
  };

  useEffect(() => {
    fetchHours();
  }, []);

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
