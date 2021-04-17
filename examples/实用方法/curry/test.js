function curry(func, len = func.length, holder = curry) {
  return _curry.call(this, func, len, holder, [], []);
}

function _curry(func, len, holder, args, holders) {
  return function (...params) {
    const _args = [...args];
    const _holders = [...holders];
    params.forEach((arg) => {
      // 如果是占位符
      if (arg === holder) {
        // 如果不存在原占位符列表
        if (!holders.length) {
          _args.push(arg);
          _holders.push(_args.length - 1);
        }
        // 存在原占位符列表，删除原占位符占位
        else {
          holders.shift();
        }
      }
      // 如果是实参
      else {
        // 如果不存在原占位符列表
        if (!holders.length) {
          _args.push(arg);
        }
        // 如果存在原占位符列表
        else {
          const index = holders.shift();
          _holders.splice(_holders.indexOf(index), 1);
          _args[index] = arg;
        }
      }
    });
    if (_args.length >= len && _args.slice(0, len).every((v) => v !== _)) {
      return func.apply(this, _args);
    }
    return _curry.call(this, func, len, holder, _args, _holders);
  };
}

const _ = {};
const fn = function (a, b, c, d, e) {
  console.log(a, b, c, d, e);
};
const _fn = curry(fn, fn.length, _);

// _fn(1, 2, 3, 4, 5); // 1 2 3 4 5
_fn(_, 2, 3, 4, 5)(1); // 1 2 3 4 5
// _fn(1, _, 3, 4, 5)(2); // 1 2 3 4 5
// _fn(1, _, 3)(_, 4, _)(2)(5); // 1 2 3 4 5
// _fn(1, _, _, 4)(_, 3)(2)(5); // 1 2 3 4 5
// _fn(_, 2)(_, _, 4)(1)(3)(5); // 1 2 3 4 5
