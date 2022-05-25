import { intersection } from '../libs/array';
import { rotation as rotationComponent } from '../components';

export const accelerateRotation = stageId => (getState, dispatch, deltaTime) => {
  const { rotation, angularAcceleration } = getState();
  const ids = intersection(rotation.allIds, angularAcceleration.allIds);
  const r = deltaTime / 1000;

  ids.forEach(id => {
    const { rollSpeed = 0, pitchSpeed = 0, yawSpeed = 0 } = rotation.byId[id];
    const {
      rollAccel = 0,
      pitchAccel = 0,
      yawAccel = 0,
      maxRollSpeed = Infinity,
      maxPitchSpeed = Infinity,
      maxYawSpeed = Infinity,
      minYawSpeed = -Infinity,
    } = angularAcceleration.byId[id];

    if (rollAccel !== 0 || pitchAccel !== 0 || yawAccel !== 0) {
      let newRollSpeed = rollSpeed + rollAccel * r;
      let newPitchSpeed = pitchSpeed + pitchAccel * r;
      let newYawSpeed = yawSpeed + yawAccel * r;

      newRollSpeed = Math.abs(newRollSpeed) > maxRollSpeed
        ? maxRollSpeed * (newRollSpeed < 0 ? -1 : 1)
        : newRollSpeed;

      newPitchSpeed = Math.abs(newPitchSpeed) > maxPitchSpeed
        ? maxPitchSpeed * (newPitchSpeed < 0 ? -1 : 1)
        : newPitchSpeed;

      if (yawAccel < 0) {
        newYawSpeed = Math.max(newYawSpeed, minYawSpeed)
      } else {
        newYawSpeed = Math.min(newYawSpeed, maxYawSpeed);
      }

      // newYawSpeed = Math.abs(newYawSpeed) > maxYawSpeed
      //   ? maxYawSpeed * (newYawSpeed < 0 ? -1 : 1)
      //   : newYawSpeed;

      dispatch(rotationComponent.update(id, {
        rollSpeed: newRollSpeed,
        pitchSpeed: newPitchSpeed,
        yawSpeed: newYawSpeed,
      }));
    }
  });
};