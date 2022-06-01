import { uid } from '../libs/uid';
import { appearance as appearanceComponent, position as positionComponent } from '../components';
import {
  circle as circleComponent
} from '../components';
import { random, randomInt } from '../libs/number';

export const addStar = (getState, dispatch, { xPos, yPos }) => {
  const id = uid();
  // https://en.wikipedia.org/wiki/Color_index
  const rgbs = [
    [255, 127, 127],
    [255, 255, 127],
    [239, 255, 223],
    [207, 255, 255],
    [192, 207, 255],
    [80, 160, 255],
    [112, 112, 255],
  ]

  const size = randomInt(0, 6);
  dispatch(positionComponent.add(id, { xPos, yPos }));
  dispatch(circleComponent.add(id, { radius: 0.3 + size * 0.1}))
  dispatch(appearanceComponent.add(id, { fill: rgbs[size], shadowBlur: 3 }));

  return id;
}