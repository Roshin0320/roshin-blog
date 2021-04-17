// #region define
/**
 * 将函数柯里化
 * @param {Function} func 待柯里化的原函数
 * @param {Number} len 所需的参数个数，默认为原函数的形参个数
 * @returns {*} 柯里化后的函数
 */
function curry(func, len = func.length) {
  const args1 = Array.prototype.slice.call(arguments, 2);
  return function () {
    const args2 = Array.prototype.slice.call(arguments);
    const args = [].concat(args1, args2);
    if (args.length >= len) {
      return func.apply(this, args);
    }
    return curry.call(this, func, len, ...args);
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
