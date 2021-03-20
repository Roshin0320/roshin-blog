(() => {
  // #region example1
  function fn(n = 100) {
    let count = 0;
    for (let i = 0; i <= n / 7; i++) {
      for (let j = 0; j <= n / 3; j++) {
        for (let k = 0; k <= n / 2; k++) {
          if (i * 7 + j * 3 + k * 2 === n) {
            count += 1;
          }
        }
      }
    }
    return count;
  }
  // #endregion example1
  console.log('example1', fn(100));
})();

(() => {
  // #region example1-better
  function fn(n = 100) {
    let count = 0;
    for (let i = 0; i <= n / 7; i++) {
      for (let j = 0; j <= n / 3; j++) {
        if (n - i * 7 - j * 3 >= 0 && (n - i * 7 - j * 3) % 2 === 0) {
          count += 1;
        }
      }
    }
    return count;
  }
  // #endregion example1-better
  console.log('example1_better', fn(100));
})();

(() => {
  // #region example2
  function fn(arr = [1, 2, 3, 4, 5, 5, 6]) {
    let val_max = 1;
    let time_max = 0;
    for (let i = 0; i < arr.length; i++) {
      let time_tmp = 0;
      for (let j = 0; j < arr.length; j++) {
        if (arr[i] === arr[j]) {
          time_tmp += 1;
        }
        if (time_tmp > time_max) {
          time_max = time_tmp;
          val_max = arr[i];
        }
      }
    }
    return val_max;
  }
  // #endregion example2
  console.log('example2', fn([1, 2, 3, 4, 5, 5, 6]));
})();

(() => {
  // #region example2-better
  function fn(arr = [1, 2, 3, 4, 5, 5, 6]) {
    const map = new Map();
    for (let i = 0; i < arr.length; i++) {
      // 实现数组转字典
      if (map.has(arr[i])) {
        map.set(arr[i], map.get(arr[i]) + 1);
      } else {
        map.set(arr[i], 1);
      }
    }

    let val_max = -1;
    let time_max = 0;
    for (const key of map.keys()) {
      if (map.get(key) > time_max) {
        time_max = map.get(key);
        val_max = key;
      }
    }
    return val_max;
  }
  // #endregion example2-better
  console.log('example2_better', fn([1, 2, 3, 4, 5, 5, 6]));
})();

(() => {
  // #region answer
  function fn(n = 100) {
    let count = 0;
    for (let i = 0; i <= n / 7; i++) {
      for (let j = 0; j <= (n - 7 * i) / 3; j++) {
        if (n - i * 7 - j * 3 >= 0 && (n - i * 7 - j * 3) % 2 === 0) {
          count += 1;
        }
      }
    }
    return count;
  }
  // #endregion answer
  console.log('answer', fn(100));
})();
