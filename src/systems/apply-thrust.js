import { intersection } from '../libs/array';
import { acceleration as accelerationComponent } from '../components';

export const applyThrust = stageId => (getState, dispatch, deltaTime) => {
  const { thrust, acceleration, orientation } = getState();
  const ids = intersection(thrust.allIds, acceleration.allIds, orientation.allIds);

  ids.forEach(id => {
    const { force } = thrust.byId[id];

    const { yaw } = orientation.byId[id];

    const xAccel = force * Math.cos(yaw);
    const yAccel = force * Math.sin(yaw);

    dispatch(accelerationComponent.update(id, {
      xAccel,
      yAccel,
    }));
  });
};