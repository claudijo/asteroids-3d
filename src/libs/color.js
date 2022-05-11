import { clamp, valueMap } from './number';

export const shadeOf = (rgb, shade) => {
  let percent = 0;

  if (shade > 0) {
    percent = valueMap(0, 80, 0, 1, shade);
  } else if (shade < 0) {
    percent = valueMap(-100, 0, -1, 0, shade);
  }

  const r = clamp(rgb[0] + Math.floor(percent / 100 * 255), 0, 255);
  const g = clamp(rgb[1] + Math.floor(percent / 100 * 255), 0, 255);
  const b = clamp(rgb[2] + Math.floor(percent / 100 * 255), 0, 255);

  return `rgb(${r},${g},${b})`;
}