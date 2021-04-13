/* eslint-disable no-inner-declarations */

// #region examples
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const auto = new Car('Honda', 'Accord', 1998);

console.log(auto instanceof Car); // true
console.log(auto instanceof Object); // true
// #endregion examples

// #region answer
function instabceof(target, origin) {
  while (target) {
    if (Object.getPrototypeOf(target) === origin.prototype) return true;
    target = Object.getPrototypeOf(target);
  }
  return false;
}

console.log(instabceof(auto, Car)); // true
console.log(instabceof(auto, Object)); // true
// #endregion answer
