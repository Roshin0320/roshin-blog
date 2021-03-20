// #region fn1
function fn1(n) {
  let count = 0;
  for (let i = 0; i <= n / 7; i++) {
    // 语句执行 n 次
    for (let j = 0; j <= n / 3; j++) {
      // 语句执行 n² 次
      for (let k = 0; k <= n / 2; k++) {
        // 语句执行 n³ 次
        if (i * 7 + j * 3 + k * 2 === n) {
          count += 1;
        }
      }
    }
  }
  return count;
}
// #endregion fn1

// #region fn2
function fn2(n) {
  let count = 0;
  for (let i = 0; i <= n / 7; i++) {
    // 语句执行 n 次
    for (let j = 0; j <= n / 3; j++) {
      // 语句执行 n² 次
      if (n - i * 7 - j * 3 >= 0 && (n - i * 7 - j * 3) % 2 === 0) {
        count += 1;
      }
    }
  }
  return count;
}
// #endregion fn2

console.log(fn1(100), fn2(100));
