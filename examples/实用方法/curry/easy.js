// #region define
/**
 * 将函数柯里化
 * @param {Function} func 待柯里化的原函数
 * @param {Number} len 所需的参数个数，默认为原函数的形参个数
 * @returns {*} 柯里化后的函数
 */
function curry(func, len = func.length) {
  return _curry.call(this, func, len);
}

/**
 * 柯里化中转函数
 * @param {Function} func 待柯里化的原函数
 * @param {Number} len 所需的参数个数，默认为原函数的形参个数
 * @param {Number} args 已接收的函数列表
 * @returns {*} 继续柯里化函数或最终结果
 */
function _curry(func, len, ...args) {
  return function (...params) {
    const _args = [...args, ...params];
    // 接收足够参数后，执行原函数
    if (_args.length >= len) {
      return func.apply(this, _args);
    }
    return _curry.call(this, func, len, ..._args);
  };
}
// #endregion define

// #region examples
const fn = curry(function (a, b, c, d, e) {
  console.log(a, b, c, d, e);
});

fn(1, 2, 3, 4, 5); // 1 2 3 4 5
fn(1)(2)(3, 4, 5); // 1 2 3 4 5
fn(1, 2)(3, 4)(5); // 1 2 3 4 5
fn(1)(2)(3)(4)(5); // 1 2 3 4 5
// #endregion examples
