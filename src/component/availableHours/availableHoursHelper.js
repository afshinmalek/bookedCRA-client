let hours = [9, 10, 11, 12, 1, 2, 3, 4, 5];
let booked = [{ start: 10 }, { start: 1 }, { start: 4 }];

function findAvailableHours() {
  let available = [];
  let i = 0;
  let j = 0;
  while (i < hours.length) {
    console.log("i: " + i + ", j: " + j);
    if (j === booked.length || hours[i] !== booked[j].start) {
      available.push(hours[i]);
      i++;
    }
    if (j !== booked.length && hours[i] === booked[j].start) {
      i++;
      j++;
    }
  }
  console.log(available);
  return available;
}
findAvailableHours();
