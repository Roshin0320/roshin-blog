// #region define
/**
 * 将函数柯里化
 * @param {Function} func 待柯里化的原函数
 * @param {Number} len 所需的参数个数，默认为原函数的形参个数
 * @param {*} holder 占位符，默认为当前柯里化函数
 * @returns {*} 柯里化后的函数
 */
function curry(func, len = func.length, holder = curry) {
  return _curry.call(this, func, len, holder, [], []);
}

/**
 * 柯里化中转函数
 * @param {Function} func 待柯里化的原函数
 * @param {Number} len 所需的参数个数，默认为原函数的形参个数
 * @param {Number} holder 接收的占位符
 * @param {Number} args 已接收的函数列表
 * @param {Number} holders 已接收的占位符位置列表
 * @returns {*} 继续柯里化函数或最终结果
 */
function _curry(func, len, holder, args, holders) {
  return function (...params) {
    const _args = [...args]; // 将参数复制一份，避免多次操作同一函数导致参数混乱
    const _holders = [...holders]; // 将占位符位置列表复制一份，新增加的占位符增加到此

    // 遍历接收到的参数列表
    params.forEach((arg) => {
      // 如果当前的这个参数是正常参数
      if (arg !== holder) {
        // 如果原占位符位置列表中不存在占位符，直接追加到参数列表当中
        if (!holders.length) {
          _args.push(arg);
        }
        // 如果原占位符位置列表中存在占位符，则替换掉参数列表里的占位符
        else {
          const index = holders.shift(); // 获取之前还未被替换的占位符位置
          // 删除替换的占位符，这里 _holders 可能会存在新的占位符，所以不能删除第一个元素
          _holders.splice(_holders.indexOf(index), 1);
          _args[index] = arg;
        }
      }
      // 如果当前的这个参数是占位符
      else {
        // 如果原占位符位置列表中不存在占位符，记录占位符的位置
        if (!holders.length) {
          _args.push(arg);
          _holders.push(_args.length - 1);
        }
        // 如果原占位符位置列表中存在占位符，则删除原占位符位置列表中的占位
        else {
          holders.shift();
        }
      }
    });

    // 接收到指定数量的参数后，并且接收到的指定数量的参数中不存在占位符，则执行原函数
    if (_args.length >= len && _args.slice(0, len).every((v) => v !== holder)) {
      return func.apply(this, _args);
    }
    return _curry.call(this, func, len, holder, _args, _holders);
  };
}
// #endregion define

// #region examples
const fn = (a, b, c, d, e) => {
  console.log(a, b, c, d, e);
};
const _ = {}; // 定义占位符
const _fn = curry(fn, fn.length, _);

_fn(1, 2, 3, 4, 5); // 1 2 3 4 5
_fn(_, 2, 3, 4, 5)(1); // 1 2 3 4 5
_fn(1, _, 3, 4, 5)(2); // 1 2 3 4 5
_fn(1, _, 3)(_, 4, _)(2)(5); // 1 2 3 4 5
_fn(1, _, _, 4)(_, 3)(2)(5); // 1 2 3 4 5
_fn(_, 2)(_, _, 4)(1)(3)(5); // 1 2 3 4 5
// #endregion examples
