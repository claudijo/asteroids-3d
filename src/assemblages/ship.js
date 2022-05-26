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
  angularAcceleration as angularAccelerationComponent,
} from '../components';
import { uid } from '../libs/uid';
import { addProjectile } from './projectile';

export const addShip = (getState, dispatch) => {
  const id = uid();

  dispatch(positionComponent.add(id, { xPos: 0, yPos: 0, zPos: 0 }));
  dispatch(orientationComponent.add(id, { roll: 0, pitch: 0, yaw: 0 }));
  dispatch(rotationComponent.add(id, { rollSpeed: 0, pitchSpeed: 0, yawSpeed: 0, maxRoll: 0, minRoll: 0 }));
  dispatch(angularAccelerationComponent.add(id, {
    rollAccel: 0,
    pitchAccel: 0,
    yawAccel: 0,
    maxRollSpeed: 8,
    maxPitchSpeed: 0,
    maxYawSpeed: 8,
    minYawSpeed: -8,
  }));
  dispatch(velocityComponent.add(id, { xVelocity: 0, yVelocity: 0, zVelocity: 0 }));
  dispatch(accelerationComponent.add(id, { xAccel: 0, yAccel: 0, zAccel: 0, maxSpeed: 100 }));
  dispatch(thrustComponent.add(id, { power: 0 }));
  dispatch(frictionComponent.add(id, { inertia: 15 }));
  dispatch(polyhedronComponent.add(id, { faces: shipFaces, color: [128, 0, 0] }));

  window.addEventListener('keydown', event => {
    if (event.repeat) {
      return;
    }

    if (event.code === 'ArrowLeft') {
      dispatch(angularAccelerationComponent.update(id, {
        yawAccel: 20,
        maxYawSpeed: 6,
        rollAccel: -30,
        minRollSpeed: -6,
      }));

      dispatch(rotationComponent.update(id, {
        minRoll: -0.6,
      }));
    }

    if (event.code === 'ArrowRight') {
      dispatch(angularAccelerationComponent.update(id, {
        yawAccel: -20,
        minYawSpeed: -6,
        rollAccel: 30,
        maxRollSpeed: 6,
      }));

      dispatch(rotationComponent.update(id, {
        maxRoll: 0.6,
      }));
    }

    if (event.code === 'ArrowUp') {
      dispatch(thrustComponent.update(id, { power: 160 }));
    }

    if (event.code === 'Space') {
      const { position, orientation, velocity } = getState();
      const { xPos, yPos } = position.byId[id];
      const { yaw } = orientation.byId[id];
      const { xVelocity, yVelocity } = velocity.byId[id];
      addProjectile(getState, dispatch, { xPos, yPos, xVelocity, yVelocity, yaw });
    }
  });

  window.addEventListener('deviceorientation', event => {
    const beta = event.beta;
    const gamma = event.gamma;
    const isPortraitMode = screen.availHeight > screen.availWidth;
    const yaw = isPortraitMode ? gamma : beta;

    if (yaw < -10) {
      dispatch(angularAccelerationComponent.update(id, {
        yawAccel: 20,
        maxYawSpeed: 6,
        rollAccel: -30,
        minRollSpeed: -6,
      }));

      dispatch(rotationComponent.update(id, {
        minRoll: -0.6,
      }));
    }

    if (yaw > 10) {
      dispatch(angularAccelerationComponent.update(id, {
        yawAccel: -20,
        minYawSpeed: -6,
        rollAccel: 30,
        maxRollSpeed: 6,
      }));

      dispatch(rotationComponent.update(id, {
        maxRoll: 0.6,
      }));
    }

    // Leveled out
    if (yaw >= -10 && yaw <= 10) {
      const { rotation } = getState();
      const { yawSpeed } = rotation.byId[id];

      if (yawSpeed > 0) {
        dispatch(angularAccelerationComponent.update(id, {
          yawAccel: -20,
          minYawSpeed: 0,
          rollAccel: 30,
        }));

        dispatch(rotationComponent.update(id, {
          maxRoll: 0,
        }));
      } else if (yawSpeed < 0) {
        dispatch(angularAccelerationComponent.update(id, {
          yawAccel: 20,
          maxYawSpeed: 0,
          rollAccel: -30,
        }));

        dispatch(rotationComponent.update(id, {
          minRoll: 0,
        }));
      }
    }
  });

  window.addEventListener('keyup', event => {
    if (event.code === 'ArrowLeft') {
      dispatch(angularAccelerationComponent.update(id, {
        yawAccel: -20,
        minYawSpeed: 0,
        rollAccel: 30,
      }));

      dispatch(rotationComponent.update(id, {
        maxRoll: 0,
      }));
    }

    if (event.code === 'ArrowRight') {
      dispatch(angularAccelerationComponent.update(id, {
        yawAccel: 20,
        maxYawSpeed: 0,
        rollAccel: -30,
      }));

      dispatch(rotationComponent.update(id, {
        minRoll: 0,
      }));
    }

    if (event.code === 'ArrowUp') {
      dispatch(thrustComponent.update(id, { power: 0 }));
    }
  });
};