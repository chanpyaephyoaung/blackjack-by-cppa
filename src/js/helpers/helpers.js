export const wait = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), milliseconds);
  });
};

export const sumArrVals = (arr) => {
  if (arr.length === 0) return 0;
  else {
    return arr.reduce((acc, cur) => acc + cur, 0);
  }
};
