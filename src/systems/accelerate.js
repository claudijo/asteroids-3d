import { intersection } from '../libs/array';
import { velocity as velocityComponent } from '../components';

export const accelerate = stageId => (getState, dispatch, deltaTime) => {
  const { velocity, acceleration } = getState();
  const ids = intersection(velocity.allIds, acceleration.allIds);
  const r = deltaTime / 1000;

  ids.forEach(id => {
    const { xVelocity = 0, yVelocity = 0, zVelocity = 0 } = velocity.byId[id];
    const { xAccel = 0, yAccel = 0, zAccel = 0 } = acceleration.byId[id];

    if (xAccel !== 0) {
      dispatch(velocityComponent.update(id, { xVelocity: xVelocity + xAccel * r}));
    }

    if (yAccel !== 0) {
      dispatch(velocityComponent.update(id, { yVelocity: yVelocity + yAccel * r}));
    }

    if (zAccel !== 0) {
      dispatch(velocityComponent.update(id, { zVelocity: zVelocity + zAccel * r}));
    }

  })
}