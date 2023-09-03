// Promisifying setTimeouts
export const wait = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), milliseconds);
  });
};

// Finding sum of values in an array
export const sumArrVals = (arr) => {
  if (arr.length === 0) return 0;
  else {
    return arr.reduce((acc, cur) => acc + cur, 0);
  }
};

// Count occurences of array elements
// Credit: https://stackoverflow.com/a/5668029
export const countArrElOccurences = (arr) => {
  const counts = {};

  for (const num of arr) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  return counts;
};
