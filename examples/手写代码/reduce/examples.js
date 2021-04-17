const arr = [0, 1, 2, 3];
const sum = arr.reduce(function (accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);

const sum2 = arr.reduce(function (accumulator, currentValue) {
  return accumulator + currentValue;
}, 10);

console.log(sum); // 6
console.log(sum2); // 16
