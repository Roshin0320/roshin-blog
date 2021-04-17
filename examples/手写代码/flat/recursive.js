function flat(array = []) {
  let result = []; // 定义一个空数组用作保存数据使用

  for (let i = 0; i < array.length; i++) {
    const current = array[i];
    if (Array.isArray(current)) {
      result = result.concat(flat(current));
      continue;
    }
    result.push(current);
  }
  return result;
}

const arr = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
console.log(flat(arr)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
