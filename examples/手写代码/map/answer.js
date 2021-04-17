Array.prototype.myMap = function map(callback, thisArg) {
  // 首先判断传入的第一个参数是否为函数, 如果不是则抛出错误
  if (Object.prototype.toString.call(callback) !== '[object Function]') {
    throw '第一个参数必须是一个函数';
  }

  const array = this; // 拿到当前数组
  const result = []; // 定义一个空数组用作保存数据使用

  // 遍历, 调用传入的函数, 并将返回值保存在 result 中，注意这里将 this 指向改为 thisArg
  for (let i = 0; i < array.length; i++) {
    result.push(callback.call(thisArg, array[i], i, array));
  }

  return result;
};

const numbers = [1, 4, 9];
const roots = numbers.myMap(Math.sqrt);

console.log(numbers); // [1, 4, 9]
console.log(roots); // [1, 2, 3]
