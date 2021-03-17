function divide(a, b, callback) {
  const res = a / b;
  callback(res === Number.POSITIVE_INFINITY ? 'Divide by 0' : res);
}

function promisify(func) {
  return function (a, b) {
    return new Promise(resolve => {
      func(a, b, value => resolve(value));
    });
  };
}
promisify(divide)(6, 3).then(res => {
  console.log('The REsult ', res);
});
promisify(divide)(1, 0).then(res => {
  console.log('The REsult ', res);
});
