import shipFaces from '../meshes/ship.json';
import {
  orientation as orientationComponent,
  polyhedron as polyhedronComponent,
  position as positionComponent,
  rotation as rotationComponent,
  velocity as velocityComponent,
  acceleration as accelerationComponent,
  thrust as thrustComponent,
  friction as frictionComponent,
} from '../components';
import { uid } from '../libs/uid';
import { addProjectile } from './projectile';

export const addShip = (getState, dispatch) => {
  const id = uid();

  dispatch(positionComponent.add(id,{ xPos: 0, yPos: 0, zPos: 0 }));
  dispatch(orientationComponent.add(id, { roll: 0, pitch: 0, yaw: 0 }));
  dispatch(rotationComponent.add(id, { rollVelocity: 0, pitchVelocity: 0, yawVelocity: 0 }));
  dispatch(velocityComponent.add(id, { xVelocity: 0, yVelocity: 0, zVelocity: 0}));
  dispatch(accelerationComponent.add(id, { xAccel: 0, yAccel: 0, zAccel: 0, limit: 100 }));
  dispatch(thrustComponent.add(id, { power: 0 }))
  dispatch(frictionComponent.add(id, { inertia: 15 }))
  dispatch(polyhedronComponent.add(id, { faces: shipFaces, color: [128,   0,   0] }));

  window.addEventListener('keydown', event => {
    if (event.repeat) {
      return;
    }

    if (event.code === 'ArrowLeft') {
      dispatch(rotationComponent.update(id, { yawVelocity: 4 }));
      dispatch(rotationComponent.update(id, { rollVelocity: -6, minRoll: -0.6 }));
    }

    if (event.code === 'ArrowRight') {
      dispatch(rotationComponent.update(id, { yawVelocity: -4 }));
      dispatch(rotationComponent.update(id, { rollVelocity: 6, maxRoll: 0.6 }));
    }

    if (event.code === 'ArrowUp') {
      dispatch(thrustComponent.update(id, { power: 100 }));
    }

    if (event.code === 'Space') {
      const { position, orientation, velocity } = getState();
      const { xPos, yPos } = position.byId[id];
      const { yaw } = orientation.byId[id];
      const { xVelocity, yVelocity } = velocity.byId[id];
      addProjectile(getState, dispatch, { xPos, yPos, xVelocity, yVelocity, yaw});
    }
  });

  window.addEventListener('keyup', event => {
    const { rotation } = getState();

    if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
      dispatch(rotationComponent.update(id, { yawVelocity: 0 }));

      const rollVelocity = rotation.byId[id].rollVelocity < 0 ? 4 : -4;
      dispatch(rotationComponent.update(id, { rollVelocity, minRoll: 0, maxRoll: 0 }));
    }

    if (event.code === 'ArrowUp') {
      dispatch(thrustComponent.update(id, { power: 0 }));
    }
  });

};