export const clamp = (num, min, max) => {
  return Math.max(min, Math.min(num, max));
}

export const valueMap = (outMin, outMax, inMin, inMax, inValue) => {
  const diffIn = inValue - inMin;
  const rangeIn = inMax - inMin;
  const percentage = diffIn / rangeIn;

  const diff = outMax - outMin;
  return outMin + diff * percentage;
}

export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const random = (min, max) => {
  return Math.random() * (max - min) + min;
}