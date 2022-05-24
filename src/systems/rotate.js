import { intersection } from '../libs/array';
import { orientation as orientationComponent } from '../components';

export const rotate = stageId => (getState, dispatch, deltaTime) => {
  const { orientation, rotation } = getState();
  const ids = intersection(orientation.allIds, rotation.allIds);
  const r = deltaTime / 1000;

  ids.forEach(id => {
    const { roll, pitch, yaw } = orientation.byId[id];
    const { rollSpeed, pitchSpeed, yawSpeed, maxRoll = Infinity, minRoll = -Infinity } = rotation.byId[id];
    if (yawSpeed !== 0) {
      dispatch(orientationComponent.update(id, { yaw: yaw + yawSpeed * r }));
    }

    if (pitchSpeed !== 0) {
      dispatch(orientationComponent.update(id, { pitch: pitch + pitchSpeed * r }));
    }

    if (rollSpeed !== 0) {
      if (rollSpeed < 0 && roll >= minRoll) {
        dispatch(orientationComponent.update(id, { roll: roll + rollSpeed * r }));
      }

      if (rollSpeed > 0 && roll <= maxRoll) {
        dispatch(orientationComponent.update(id, { roll: roll + rollSpeed * r }));
      }
    }
  });
};