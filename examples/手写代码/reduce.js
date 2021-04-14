{
  // #region examples
  const arr = [0, 1, 2, 3];
  const sum = arr.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0);

  const sum2 = arr.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
  }, 10);

  console.log(sum); // 6
  console.log(sum2); // 16
  // #endregion examples
}

{
  // #region answer
  Array.prototype.myReduce = function reduce(callback, initialValue) {
    // 首先判断传入的第一个参数是否为函数, 如果不是则抛出错误
    if (Object.prototype.toString.call(callback) !== '[object Function]') {
      throw '第一个参数必须是一个函数';
    }

    const array = this; // 拿到当前数组
    const index = initialValue === undefined ? 1 : 0; // 如果存在初始值，索引从 1 开始，否则从 0 开始
    let accumulator = initialValue || array[0]; // 拿到初始值

    // 遍历, 调用传入的函数, 并将返回值保存在 result 中，注意这里将 this 指向改为 thisArg
    for (let i = index; i < array.length; i++) {
      accumulator = callback(accumulator, array[i], i, array);
    }

    return accumulator;
  };

  const arr = [0, 1, 2, 3];
  const sum = arr.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0);

  const sum2 = arr.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
  }, 10);

  console.log(sum); // 6
  console.log(sum2); // 16
  // #endregion answer
}
