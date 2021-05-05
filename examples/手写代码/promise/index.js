// Promise.resolve()
//   .then(() => {
//     console.log(0);
//     return Promise.resolve(4);
//   })
//   .then((res) => {
//     console.log(res);
//   });

// Promise.resolve()
//   .then(() => {
//     console.log(1);
//   })
//   .then(() => {
//     console.log(2);
//   })
//   .then(() => {
//     console.log(3);
//   })
//   .then(() => {
//     console.log(5);
//   })
//   .then(() => {
//     console.log(6);
//   });

new Promise((resolve, reject) => {
  console.log(0);
  try {
    // resolve(1);
    throw new Error();
  } catch (error) {
    console.log(123);
    reject(2);
  }
})
  .then((res) => {
    console.log('onResolved:', res);
    return { a: 2 };
  })
  .then((res) => {
    console.log('onResolved:', res);
  })
  .catch((err) => {
    console.log('catch: ', err);
  });
