/* eslint-disable no-inner-declarations */

{
  // #region examples
  const arr1 = [1, 2, [3, 4]];
  console.log(arr1.flat()); // [1, 2, 3, 4]

  const arr2 = [1, 2, [3, 4, [5, 6]]];
  console.log(arr2.flat()); // [1, 2, 3, 4, [5, 6]]

  const arr3 = [1, 2, [3, 4, [5, 6]]];
  console.log(arr3.flat(2)); // [1, 2, 3, 4, 5, 6]

  // 使用 Infinity，可展开任意深度的嵌套数组
  const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
  console.log(arr4.flat(Infinity)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  // #endregion examples
}

{
  // #region recursive
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
  // #endregion recursive
}

{
  // #region reduce
  function flat(array = []) {
    const result = array.reduce((accumulator, currentValue) => {
      return accumulator.concat(Array.isArray(currentValue) ? flat(currentValue) : currentValue);
    }, []);
    return result;
  }

  const arr = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
  console.log(flat(arr)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  // #endregion reduce
}

{
  // #region flat
  Array.prototype.myFlat = function flat(depth = 1) {
    const array = this; // 拿到当前数组

    // 首先判断传入的参数是否为数字, 如果不是则直接抛出
    if (isNaN(depth) || depth <= 0) {
      return array.slice();
    }

    depth = Math.floor(depth); // 向下取整拿到一个整数
    let result = []; // 定义一个空数组用作保存数据使用

    for (let i = 0; i < array.length; i++) {
      const current = array[i];
      if (Array.isArray(current)) {
        result = result.concat(current.myFlat(depth - 1));
        continue;
      }
      result.push(current);
    }
    return result;
  };

  const arr1 = [1, 2, [3, 4]];
  console.log(arr1.myFlat()); // [1, 2, 3, 4]

  const arr2 = [1, 2, [3, 4, [5, 6]]];
  console.log(arr2.myFlat()); // [1, 2, 3, 4, [5, 6]]

  const arr3 = [1, 2, [3, 4, [5, 6]]];
  console.log(arr3.myFlat(2)); // [1, 2, 3, 4, 5, 6]

  // 使用 Infinity，可展开任意深度的嵌套数组
  const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
  console.log(arr4.myFlat(Infinity)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  // #endregion flat
}
