const findAvailableHours = ({ hours, booked }, sDate) => {
  const bookedSet = new Set(booked.map((b) => b.time));
  const available = hours.filter((hour) => !bookedSet.has(hour));
  const updatedAvailable = available.map((h) => ({
    date: sDate,
    time: h,
  }));
  return updatedAvailable;
};

export default findAvailableHours;
