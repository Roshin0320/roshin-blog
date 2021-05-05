const MyPromise = require('./promise');

// new MyPromise((resolve, reject) => {
//   console.log(0);

//   // setTimeout(() => {
//   //   resolve(0);
//   // }, 1000);

//   try {
//     // resolve(1);
//     throw new Error();
//   } catch (error) {
//     console.log(123);
//     reject(2);
//   }
// })
//   .then(
//     (res) => {
//       console.log('onResolved:', res);
//       return { a: 2 };
//     }
//     // (reason) => {
//     //   console.log('onRejected:', reason);
//     // }
//   )
//   .then(
//     (res) => {
//       console.log('onResolved:', res);
//     }
//     // (reason) => {
//     //   console.log('onRejected:', reason);
//     // }
//   )
//   .catch((err) => {
//     console.log('catch: ', err);
//   });

MyPromise.resolve()
  .then(() => {
    console.log(0);
    return MyPromise.resolve(4);
  })
  .then((res) => {
    console.log(res);
  });

MyPromise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });
