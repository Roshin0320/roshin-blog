/**
 * 自定义 Promise 函数模块
 */

const STATUS = {
  PENDING: 'pending', // 初始状态，不是成功或失败状态。
  RESOLVED: 'resolved', // 意味着操作成功完成
  REJECTED: 'rejected' // 意味着操作失败
};

/**
 * 更改成功之后的状态
 * @param {*} value 成功之后的值
 */
function _resolve(value) {
  // promise 的状态只能改变一次，因此要判断是不是 pending 的状态, 否则是不能执行的
  if (this.status !== STATUS.PENDING) return;
  this.status = STATUS.RESOLVED; // 将当前 promise 状态改为 resolved
  this.result = value; // 保存成功之后的值

  // 执行所有成功的回调
  while (this.onResolvedCallbacks.length) {
    this.onResolvedCallbacks.shift()(value);
  }
}

/**
 * 更改失败之后的状态
 * @param {*} reason 失败之后的原因
 */
function _reject(reason) {
  // promise 的状态只能改变一次，因此要判断是不是 pending 的状态, 否则是不能执行的
  if (this.status !== STATUS.PENDING) return;
  this.status = STATUS.REJECTED; // 将当前 promise 状态改为 rejected
  this.reason = reason; // 保存失败之后的原因

  // 执行所有失败的回调
  while (this.onRejectedCallbacks.length) {
    this.onRejectedCallbacks.shift()(reason);
  }
}

/**
 * 集中处理 promise
 * @param {*} promise 当前 promise
 * @param {*} x 回调函数执行结果
 * @param {*} resolve 成功的回调
 * @param {*} reject 失败的回调
 */
function resolvePromise(promise, x, resolve, reject) {
  // 如果相等了，说明返回的是自己，抛出类型错误
  if (promise === x) {
    return reject(new TypeError('the promise and the return value are the same'));
  }

  // if (x instanceof Promise) {
  //   // 如果回调函数返回的是promise，return的promise的结果就是这个promise的结果
  //   x.then(resolve, reject);
  // } else {
  //   // 如果回调函数返回的不是promise，return的promise的状态是resolved，value就是返回的值。
  //   resolve(x);
  // }

  // 如果是对象或者函数
  if (typeof x === 'object' || typeof x === 'function') {
    // 如果 x 为 null，直接返回
    if (x === null) {
      return resolve(x);
    }

    let then;
    try {
      then = x.then;
    } catch (error) {
      // 如果取 x.then 时发生了错误，抛出
      return reject(error);
    }

    // 如果 then 是函数
    if (typeof then === 'function') {
      let called = false; // 记录 resolvePromise 或者 rejectPromise 是否已经被调用
      try {
        then.call(
          x, // this 指向 x
          // resolvePromise
          (v) => {
            // 如果 resolvePromise 或者 rejectPromise 已经被调用，直接返回
            if (called) return;
            called = true;
            resolvePromise(promise, v, resolve, reject);
          },
          // rejectPromise
          (e) => {
            // 如果 resolvePromise 或者 rejectPromise 已经被调用，直接返回
            if (called) return;
            called = true;
            reject(e);
          }
        );
      } catch (error) {
        // 如果 resolvePromise 或者 rejectPromise 已经被调用，直接返回
        if (called) return;
        // 调用异常
        reject(error);
      }
    } else {
      // 普通参数返回
      resolve(x);
    }
  } else {
    // 普通参数返回
    resolve(x);
  }
}

/**
 * Promise 构造函数
 * @param {Function} executor 执行器函数
 */
function MyPromise(executor) {
  const self = this;
  self.status = STATUS.PENDING; // 记录当前 promise 状态，初始值为 pending
  self.result = null; // 储存成功之后的值
  self.reason = null; // 储存失败的原因
  self.onResolvedCallbacks = []; // 记录成功的回调函数
  self.onRejectedCallbacks = []; // 记录失败的回调函数

  try {
    // 立即同步执行
    executor(_resolve.bind(self), _reject.bind(self));
  } catch (error) {
    // 如果执行器抛出异常，promise 对象变为 rejected 状态
    _reject.call(self, error);
  }
}

/**
 * Promise 原型对象的 then
 * @param onResolved 成功的回调
 * @param onReject 失败的回调
 * @returns 返回一个新的 promise 对象
 */
MyPromise.prototype.then = function (onResolved, onRejectd) {
  const self = this;
  // 添加默认函数
  const realOnResolved = typeof onResolved === 'function' ? onResolved : (value) => value;
  const realOnRejectd =
    typeof onRejectd === 'function'
      ? onRejectd
      : (reason) => {
          throw reason;
        };

  // 每次都 return 一个新的 promise
  const p = new MyPromise((resolve, reject) => {
    /**
     * 创建一个处理 resolved 的微任务队列
     */
    function resolvedMicrotask() {
      queueMicrotask(() => {
        try {
          const x = realOnResolved(self.result);

          resolvePromise(p, x, resolve, reject);
        } catch (error) {
          // 如果执行的时候抛出错误，则返回的 promise 的状态为 rejected
          reject(error);
        }
      });
    }

    /**
     * 创建一个处理 rejectd 的微任务队列
     */
    function rejectdMicrotask() {
      queueMicrotask(() => {
        try {
          const x = realOnRejectd(self.reason);

          resolvePromise(p, x, resolve, reject);
        } catch (error) {
          // 如果执行的时候抛出错误，则返回的 promise 的状态为 rejected
          reject(error);
        }
      });
    }

    // promise 当前状态还是 pending 状态，将回调函数保存起来
    if (self.status === STATUS.PENDING) {
      self.onResolvedCallbacks.push(resolvedMicrotask);
      self.onRejectedCallbacks.push(rejectdMicrotask);
    } else if (self.status === STATUS.RESOLVED) {
      resolvedMicrotask();
    } else {
      rejectdMicrotask();
    }
  });

  return p;
};

/**
 * Promise 原型对象的 catch
 * @param onReject 失败的回调
 * @returns 返回一个新的 promise 对象
 */
MyPromise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected);
};

/**
 * Promise 函数对象的 resovle 方法
 * @param result 将被 Promise 对象解析的参数，也可以是一个 Promise 对象，或者是一个 thenable
 * @returns 返回一个带着给定值解析过的 Promise 对象，如果参数本身就是一个 Promise 对象，则直接返回这个 Promise 对象
 */
MyPromise.resolve = function (result) {
  if (result instanceof MyPromise) {
    return result;
  }
  return new MyPromise((resolve) => {
    resolve(result);
  });
};

/**
 * Promise 函数对象的 reject 方法
 * @param reason 表示 Promise 被拒绝的原因
 * @returns 一个给定原因了的被拒绝的 Promise
 */
MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason);
  });
};

/**
 * Promise函数对象的all方法
 * @param iterable 一个可迭代对象，如 Array 或 String
 * @returns
 *  - 如果传入的参数是一个空的可迭代对象，则返回一个已完成（already resolved）状态的 Promise
 *  - 如果传入的参数不包含任何 promise，则返回一个异步完成（asynchronously resolved） Promise
 *  - 其它情况下返回一个处理中（pending）的 Promise
 *  - 这个返回的 promise 之后会在所有的 promise 都完成或有一个 promise 失败时异步地变为完成或失败
 *  - 返回值将会按照参数内的 promise 顺序排列，而不是由调用 promise 的完成顺序决定。
 */
MyPromise.all = function (iterable) {
  const values = new Array(iterable); // 记录结果
  let resolvedCount = 0; // 记录状态为 resolved 的数量
  return new MyPromise((resolve, reject) => {
    iterable.forEach((p, i) => {
      MyPromise.resolve(p)
        .then((v) => {
          // p状态为 resolved，将值保存起来
          values[i] = v;
          resolvedCount++;
          // 如果全部p都为resolved状态，return 的 promise 状态为 resolved
          if (resolvedCount === values.length) {
            resolve(v);
          }
        })
        // 只要有一个失败，return 的 promise 状态就为 reject
        .catch((reason) => {
          reject(reason);
        });
    });
  });
};

/**
 * Promise 函数对象的 race 方法
 * @param iterable 可迭代对象，类似 Array
 * @returns 一个待定的 Promise 只要给定的迭代中的一个 promise 解决或拒绝，就采用第一个 promise 的值作为它的值，从而异步地解析或拒绝（一旦堆栈为空）
 */
MyPromise.race = function (iterable) {
  return new Promise((resolve, reject) => {
    iterable.forEach((p) => {
      // 只要有一个成功或失败，返回的 promise 的状态就为 resolved 或 rejected
      MyPromise.resolve(p).then(resolve, reject);
    });
  });
};

module.exports = MyPromise;
