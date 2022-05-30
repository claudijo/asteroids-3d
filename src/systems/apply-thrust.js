import { intersection, range } from '../libs/array';
import { acceleration as accelerationComponent } from '../components';
import { addExhaustParticle } from '../assemblages/exhaust-particle';
import { random } from '../libs/number';

export const applyThrust = stageId => (getState, dispatch, deltaTime) => {
  const { thrust, acceleration, orientation, velocity, position } = getState();
  const ids = intersection(thrust.allIds, acceleration.allIds, orientation.allIds);

  ids.forEach(id => {
    const { power } = thrust.byId[id];
    const { yaw } = orientation.byId[id];
    const { xPos, yPos } = position.byId[id];
    const { xVelocity, yVelocity } = velocity.byId[id];

    const xAccel = power * Math.cos(yaw);
    const yAccel = power * Math.sin(yaw);

    dispatch(accelerationComponent.update(id, {
      xAccel,
      yAccel,
    }));

    if (power > 0) {
      range(Math.floor(deltaTime / 8)).forEach(_ => {
        addExhaustParticle(getState, dispatch, { xPos, yPos, xVelocity, yVelocity, yaw: yaw - Math.PI + random(-0.15, 0.15)})
      });
    }
  });
};