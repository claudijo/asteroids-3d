import { intersection } from '../libs/array';
import { length, multiply } from '../libs/vector';
import { velocity as velocityComponent} from '../components';

export const slowDown = stageId => (getState, dispatch, deltaTime) => {
  const { velocity, friction } = getState();
  const ids = intersection(velocity.allIds, friction.allIds);
  const r = deltaTime / 1000;

  ids.forEach(id => {
    const { xVelocity = 0, yVelocity = 0, zVelocity = 0 } = velocity.byId[id];
    const { inertia } = friction.byId[id];
    const velocityVector = [xVelocity, yVelocity];
    const speed = length(velocityVector);

    if (speed > 0) {
      const reducedSpeed = Math.max(0, speed - inertia * r);
      const [xVelocity, yVelocity] = multiply(reducedSpeed / speed, velocityVector);
      dispatch(velocityComponent.update(id, { xVelocity, yVelocity}))
    }
  })
}