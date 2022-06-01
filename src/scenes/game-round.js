import { addShip } from '../assemblages/ship';
import { range } from '../libs/array';
import { randomInt } from '../libs/number';
import { addAsteroid } from '../assemblages/asteroid';
import { addStar } from '../assemblages/star';

export const showGameRound = (store, world) => {
  // Ship
  addShip(store.getState, store.dispatch);

  // Initial asteroids
  const halfWidth = world.width / 2;
  const halfHeight = world.height / 2;
  range(5).forEach(_ => {
    const xPos = randomInt(-halfWidth, halfWidth);
    const yPos = randomInt(-halfHeight, halfHeight);
    addAsteroid(store.getState, store.dispatch, { cohort: 0, xPos, yPos });
  });

  range(100).forEach(_ => {
    const xPos = randomInt(-halfWidth, halfWidth);
    const yPos = randomInt(-halfHeight, halfHeight);
    addStar(store.getState, store.dispatch, { xPos, yPos });
  })
}