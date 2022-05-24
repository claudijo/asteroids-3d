import { intersection } from '../libs/array';
import { length, multiply } from '../libs/vector';
import { velocity as velocityComponent } from '../components';

export const accelerate = stageId => (getState, dispatch, deltaTime) => {
  const { velocity, acceleration } = getState();
  const ids = intersection(velocity.allIds, acceleration.allIds);
  const r = deltaTime / 1000;

  ids.forEach(id => {
    const { xVelocity = 0, yVelocity = 0 } = velocity.byId[id];
    const { xAccel = 0, yAccel = 0, maxSpeed = Infinity } = acceleration.byId[id];

    if (xAccel !== 0 || yAccel !== 0) {
      let velocityVector = [xVelocity + xAccel * r, yVelocity + yAccel * r];
      const speed = length(velocityVector);
      if (speed > maxSpeed) {
        velocityVector = multiply(maxSpeed / speed, velocityVector);
      }
      dispatch(velocityComponent.update(id, { xVelocity: velocityVector[0], yVelocity: velocityVector[1]}));
    }
  })
}