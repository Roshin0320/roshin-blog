function instabceof(target, origin) {
  while (target) {
    if (Object.getPrototypeOf(target) === origin.prototype) return true;
    target = Object.getPrototypeOf(target);
  }
  return false;
}

const arr = [1, 2, 3];

console.log(instabceof(arr, Array)); // true
console.log(instabceof(arr, Object)); // true
