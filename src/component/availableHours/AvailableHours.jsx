import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedHour, setHours } from "../redux/slice/timeSlice";
import findAvailableHours from "./availableHoursHelper";

function AvailableHours() {
  const selectedHour = useSelector(
    (state) => state.availableHours.selectedHour
  );
  const hours = useSelector((state) => state.availableHours.hours);
  const dispatch = useDispatch();
  //useMemo
  const booked = useMemo(() => [{ start: 10 }, { start: 1 }, { start: 3 }], []);

  // let hours = [9, 10, 11, 12, 1, 2, 3, 4, 5];

  useEffect(() => {
    const available = findAvailableHours(hours, booked);
    dispatch(setHours(available));
  }, [hours, booked, dispatch]);

  const handleClick = (hour) => {
    dispatch(setSelectedHour(hour));
  };

  const hoursButton = hours.map((hour) => (
    <div key={hour}>
      <button onClick={() => handleClick(hour)}>{hour}</button>
    </div>
  ));

  return (
    <div>
      {hoursButton}
      {selectedHour && <p>Selected Hour: {selectedHour}</p>}
    </div>
  );
}

export default AvailableHours;
