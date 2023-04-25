function findAvailableHours(hours, booked) {
  const bookedSet = new Set(booked.map((b) => b.time));
  const available = hours.filter((hour) => !bookedSet.has(hour));

  return available;
}
export default findAvailableHours;
