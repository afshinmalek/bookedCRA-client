function findAvailableHours(hours, booked) {
  const bookedSet = new Set(booked.map((b) => b.time));
  const available = hours.filter((hour) => !bookedSet.has(hour));
  const availableWdate = available.map((h) => ({
    date: booked[0]?.date || new Date(),
    time: h,
  }));

  return available;
}
export default findAvailableHours;
