{
  // #region O-1
  let i = 1;
  let j = 2;
  ++i;
  j++;
  let m = i + j;
  // #endregion O-1
  console.log(m++);
}

const n = 10;

// #region O-n
for (let i = 1; i < n; i++) {
  // 语句执行 n 次
}
// #endregion O-n

{
  // #region O-logn
  let i = 1;
  while (i < n) {
    i = i * 2;
  }
  // #endregion O-logn
}

// #region O-nlogn
for (let i = 1; i < n; i++) {
  let j = 1;
  while (j < n) {
    j = j * 2;
  }
}
// #endregion O-nlogn

// #region O-n-2
for (let i = 0; i < n; i++) {
  // 语句执行 n 次
  for (let j = 0; j < n; j++) {
    // 语句执行 n² 次
  }
}
// #endregion O-n-2

// #region O-n-3
for (let i = 1; i < n; i++) {
  // 语句执行 n 次
  for (let j = 1; j < n; j++) {
    // 语句执行 n² 次
    for (let k = 1; k < n; k++) {
      // 语句执行 n³ 次
    }
  }
}
// #endregion O-n-3

// #region O-n-k
for (let i = 1; i < n; i++) {
  // 语句执行 n 次
  for (let j = 1; j < n; j++) {
    // 语句执行 n² 次
    for (let k = 1; k < n; k++) {
      // 语句执行 n³ 次
      // ...
    }
  }
}
// #endregion O-n-k

(() => {
  // #region O-2-n
  function fn(n) {
    if (n === 0) return 1;
    return fn(n - 1) + fn(n - 1);
  }
  // #endregion O-2-n
  fn(3);
})();

{
  // #region S-n
  const arr = [];
  for (let i = 1; i < n; i++) {
    arr[i] = i;
  }
  // #endregion S-n
}

{
  // #region S-n-2
  const arr = [];
  for (let i = 1; i < n; i++) {
    arr[i] = [];
    for (let j = 1; j < n; j++) {
      arr[i][j] = i + j;
    }
  }
  // #endregion S-n-2
}

// #region practice
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < n; k++) {
      // ...
    }
    for (let m = 0; m < n; m++) {
      // ...
    }
  }
}
// #endregion practice

// #region answer
for (let i = 0; i < n; i++) {
  // 语句执行 n 次
  for (let j = 0; j < n; j++) {
    // 语句执行 n² 次
    for (let k = 0; k < n; k++) {
      // 语句执行 n³ 次
      // ...
    }
    for (let m = 0; m < n; m++) {
      // 语句执行 n³ 次
      // ...
    }
  }
}
// #endregion answer
