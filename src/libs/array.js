export const range = (size, startAt = 0) => {
  return [...Array(size).keys()].map(i => i + startAt);
}

export const sum = (...nums) => {
  return nums.reduce((acc, num) => acc + num, 0);
}

export const intersection = (arr1, arr2, ...rest) => {
  const filtered = arr1.filter(value => arr2.includes(value));
  return rest.length > 0
    ? intersection(filtered, ...rest)
    : filtered;
};

export const sortedIndex = (array, value, compare = (a, b) => a - b) => {
  let low = 0;
  let high = array.length;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (compare(array[mid], value) < 0) {
      low = mid + 1;
    }
    else high = mid;
  }
  return low;
}

export const insertAt = (array, index, item) => {
  array.splice(index, 0, item);
}
