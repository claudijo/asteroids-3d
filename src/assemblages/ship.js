import shipFaces from '../wireframes/ship.json';
import rotation from '../components/rotation';
import position from '../components/position';
import polyhedron from '../components/polyhedron';
import orientation from '../components/orientation';
import { matrixMultiply, xRotationMatrix } from '../libs/vector';
import orientationComponent from '../components/orientation';

export const addShip = (getState, dispatch, { id }) => {
  dispatch(position.add(id, { coords: [0, 0, 0] }));
  dispatch(orientation.add(id, { matrix: [[1, 0, 0], [0, 1, 0], [0, 0, 1]] }));
  dispatch(rotation.add(id, { vx: 0, vy: 0, vz: 0 }));
  // dispatch(keyboardControl.add(id,
  //   {
  //     'ArrowLeft': { rotation: { vz: 1 } },
  //   }));
  // dispatch(setVelocity(id, [0,0,0]));
  // dispatch(setAcceleration(id, [0,0,0]));
  // dispatch(setAppearance(id, {
  //   fillStyle: 'Blue'
  // }))
  dispatch(polyhedron.add(id, { faces: shipFaces }));

  window.addEventListener('keydown', event => {
    if (event.repeat) {
      return;
    }

    const { orientation } = getState();

    if (event.code === 'ArrowLeft') {
      dispatch({}); // Need to trigger elapsed timer if stage is idle
      requestAnimationFrame(() => {
        dispatch(rotation.update(id, { vz: 2 }));
        let { matrix } = orientation.byId[id];
        matrix = matrixMultiply( matrix, xRotationMatrix(-0.3))
        dispatch(orientationComponent.update(id, { matrix }))
      })
    }

    if (event.code === 'ArrowRight') {
      dispatch({}); // Need to trigger elapsed timer if stage is idle
      requestAnimationFrame(() => {

        dispatch(rotation.update(id, {  vz: -2 }));

        let { matrix } = orientation.byId[id];
        matrix = matrixMultiply( matrix, xRotationMatrix(0.3))
        dispatch(orientationComponent.update(id, { matrix }))
      });
    }
  });

  window.addEventListener('keyup', event => {
    if (event.code === 'ArrowLeft') {
      dispatch(rotation.update(id, { vz: 0 }));

      const { orientation } = getState();
      let { matrix } = orientation.byId[id];
      matrix = matrixMultiply( matrix, xRotationMatrix(0))
      dispatch(orientationComponent.update(id, { matrix }))
    }

    if (event.code === 'ArrowRight') {
      dispatch(rotation.update(id, { vz: 0 }));

      const { orientation } = getState();
      let { matrix } = orientation.byId[id];
      matrix = matrixMultiply( matrix, xRotationMatrix(0))
      dispatch(orientationComponent.update(id, { matrix }))
    }
  });

};