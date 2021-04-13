{
  // #region examples
  const numbers = [1, 4, 9];
  const roots = numbers.map(Math.sqrt);

  console.log(numbers); // [1, 4, 9]
  console.log(roots); // [1, 2, 3]
  // #endregion examples
}

{
  // #region answer
  Array.prototype.myMap = function map(callback, thisArg) {
    // 首先判断传入的第一个参数是否为函数, 如果不是则抛出错误
    if (Object.prototype.toString.call(callback) !== '[object Function]') {
      throw '第一个参数必须是一个函数';
    }

    const result = []; // 定义一个空数组用作保存数据使用
    const currentArr = this; // currentArr 指向 this, this 也就是调用该 map 方法的数组本身

    // 遍历, 调用传入的函数, 并将返回值保存在 result 中，注意这里将 this 指向改为 thisArg
    for (let i = 0; i < currentArr.length; i++) {
      result.push(callback.call(thisArg, currentArr[i], i, currentArr));
    }

    return result;
  };

  const arr = [1, 2, 3];
  const newArr = arr.myMap(() => 1);
  console.log(newArr); // [ 1, 1, 1 ]
  // #endregion answer
}
