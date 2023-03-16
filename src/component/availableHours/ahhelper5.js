function findAvailableHours(hours, booked, date) {
  const bookedSet = new Set(booked.map((b) => b.time));
  const available = [];

  for (let i = 0; i < hours.length; i++) {
    const hour = hours[i];
    if (!bookedSet.has(hour)) {
      available.push({ time: hour, date });
    }
  }

  return available;
}

export default findAvailableHours;
