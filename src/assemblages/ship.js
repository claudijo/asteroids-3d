import shipFaces from '../meshes/ship.json';
import rotationComponent from '../components/rotation';
import positionComponent from '../components/position';
import polyhedronComponent from '../components/polyhedron';
import orientationComponent from '../components/orientation';

export const addShip = (getState, dispatch, { id }) => {
  dispatch(positionComponent.add(id,{ xPos: 0, yPos: 30, zPos: 0 }));
  dispatch(orientationComponent.add(id, { roll: 0, pitch: 0, yaw: 0 }));
  dispatch(rotationComponent.add(id, { rollVelocity: 0, pitchVelocity: 0, yawVelocity: 0 }));
  // dispatch(keyboardControl.add(id,
  //   {
  //     'ArrowLeft': { rotation: { vz: 1 } },
  //   }));
  // dispatch(setVelocity(id, [0,0,0]));
  // dispatch(setAcceleration(id, [0,0,0]));
  dispatch(polyhedronComponent.add(id, {
    faces: shipFaces, color: [0, 0, 255]
  }));

  window.addEventListener('keydown', event => {
    if (event.repeat) {
      return;
    }

    if (event.code === 'ArrowLeft') {
      dispatch({}); // Need to trigger elapsed timer if stage is idle
      requestAnimationFrame(() => {
        dispatch(rotationComponent.update(id, { yawVelocity: 2 }));
        dispatch(rotationComponent.update(id, { rollVelocity: -4, minRoll: -0.6 }));
      });
    }

    if (event.code === 'ArrowRight') {
      dispatch({}); // Need to trigger elapsed timer if stage is idle
      requestAnimationFrame(() => {
        dispatch(rotationComponent.update(id, { yawVelocity: -2 }));
        dispatch(rotationComponent.update(id, { rollVelocity: 4, maxRoll: 0.6 }));
      });
    }
  });

  window.addEventListener('keyup', event => {
    const { rotation } = getState();

    if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
      dispatch(rotationComponent.update(id, { yawVelocity: 0 }));

      const rollVelocity = rotation.byId[id].rollVelocity < 0 ? 4 : -4;
      dispatch(rotationComponent.update(id, { rollVelocity, minRoll: 0, maxRoll: 0 }));
    }
  });

};