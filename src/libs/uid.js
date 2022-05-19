// https://github.com/lukeed/uid
const HEX = [];
const SIZE = 256;
let IDX = 256;
let BUFFER;

while (IDX--) HEX[IDX] = (IDX + 256).toString(16).substring(1);

export function uid(len) {
  let i = 0;
  const tmp = (len || 11);
  if (!BUFFER || ((IDX + tmp) > SIZE * 2)) {
    for (BUFFER = '', IDX = 0; i < SIZE; i++) {
      BUFFER += HEX[Math.random() * 256 | 0];
    }
  }

  return BUFFER.substring(IDX, IDX++ + tmp);
}