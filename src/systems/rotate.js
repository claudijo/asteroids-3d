import { intersection } from '../libs/array';
import { matrixMultiply, xRotationMatrix, yRotationMatrix, zRotationMatrix } from '../libs/vector';
import orientationComponent from '../components/orientation';

export const rotate = stageId => (getState, dispatch, elapsed) => {
  const { orientation, rotation } = getState();
  const ids = intersection(orientation.allIds, rotation.allIds);
  const r = elapsed / 1000;

  ids.forEach(id => {
    const { roll, pitch, yaw } = orientation.byId[id];
    const { rollVelocity, pitchVelocity, yawVelocity, maxRoll, minRoll } = rotation.byId[id];
    if (yawVelocity !== 0) {
      dispatch(orientationComponent.update(id, { yaw: yaw + yawVelocity * r }));
    }

    if (rollVelocity !== 0) {
      if (rollVelocity < 0 && roll >= minRoll) {
        dispatch(orientationComponent.update(id, { roll: roll + rollVelocity * r }));
      }

      if (rollVelocity > 0 && roll <= maxRoll) {
        dispatch(orientationComponent.update(id, { roll: roll + rollVelocity * r }));
      }
    }
  });
};