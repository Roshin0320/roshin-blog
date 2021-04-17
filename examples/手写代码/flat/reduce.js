function flat(array = []) {
  const result = array.reduce((accumulator, currentValue) => {
    return accumulator.concat(Array.isArray(currentValue) ? flat(currentValue) : currentValue);
  }, []);
  return result;
}

const arr = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
console.log(flat(arr)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
