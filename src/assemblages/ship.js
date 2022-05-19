import shipFaces from '../meshes/ship.json';
import rotationComponent from '../components/rotation';
import positionComponent from '../components/position';
import polyhedronComponent from '../components/polyhedron';
import orientationComponent from '../components/orientation';
import lineSegmentComponent from '../components/line-segment';
import { uid } from '../libs/uid';
import { multiply, toCartesian } from '../libs/vector';
import velocityComponent from '../components/velocity';


export const addShip = (getState, dispatch) => {
  const id = uid();

  dispatch(positionComponent.add(id,{ xPos: 0, yPos: 0, zPos: 0 }));
  dispatch(orientationComponent.add(id, { roll: 0, pitch: 0, yaw: 0 }));
  dispatch(rotationComponent.add(id, { rollVelocity: 0, pitchVelocity: 0, yawVelocity: 0 }));
  dispatch(polyhedronComponent.add(id, {
    faces: shipFaces, color: [0, 0, 255]
  }));

  window.addEventListener('keydown', event => {
    if (event.repeat) {
      return;
    }

    if (event.code === 'ArrowLeft') {
      dispatch(rotationComponent.update(id, { yawVelocity: 2 }));
      dispatch(rotationComponent.update(id, { rollVelocity: -4, minRoll: -0.6 }));
    }

    if (event.code === 'ArrowRight') {
      dispatch(rotationComponent.update(id, { yawVelocity: -2 }));
      dispatch(rotationComponent.update(id, { rollVelocity: 4, maxRoll: 0.6 }));
    }

    if (event.code === 'Space') {
      const projectileId = uid();
      const { position, orientation } = getState();
      const { xPos, yPos } = position.byId[id];
      const { yaw } = orientation.byId[id];

      const [xVelocity, yVelocity] = toCartesian([50, yaw])

      dispatch(positionComponent.add(projectileId, { xPos, yPos }));
      dispatch(orientationComponent.add(projectileId, { yaw }));
      dispatch(velocityComponent.add(projectileId, { xVelocity, yVelocity }));
      dispatch(lineSegmentComponent.add(projectileId, {
        length: 4,
        width: 6,
        color: [255,  0,  0],
      }))
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