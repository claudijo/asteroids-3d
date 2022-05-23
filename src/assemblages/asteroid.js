import { random } from '../libs/number';
import {
  acceleration as accelerationComponent,
  hitSphere as hitSphereComponent,
  orientation as orientationComponent,
  polyhedron as polyhedronComponent,
  position as positionComponent,
  rotation as rotationComponent,
  velocity as velocityComponent,
  health as healthComponent,
  generation as generationComponent,
} from '../components';
import { distort, subdivide } from '../libs/mesh';
import { length, multiply } from '../libs/vector';
import icosahedron from '../meshes/icosahedron.json';
import octahedron from '../meshes/octahedron.json';
import { uid } from '../libs/uid';

const getFaces = cohort => {
  switch (cohort) {
    case 0:
      return distort(subdivide(icosahedron, 1)).map(face => face.map(vector => multiply(10, vector)));
    case 1:
      return distort(subdivide(octahedron, 1)).map(face => face.map(vector => multiply(7, vector)));
    case 2:
      return distort(subdivide(icosahedron, 0)).map(face => face.map(vector => multiply(5, vector)));
    default:
      throw new Error('Unknown asteroid generation ' + cohort);
  }
};

const getRgb = cohort => {
  switch (cohort) {
    case 0:
      return [70, 130, 180];
    case 1:
      return [0, 100,   0];
    case 2:
      return [75, 0, 130];
    default:
      throw new Error('Unknown asteroid generation ' + cohort);
  }
};

export const addAsteroid = (getState, dispatch, { cohort = 0, xPos, yPos }) => {
  const id = uid();
  const zPos = 0;
  const faces = getFaces(cohort);
  const hitSphereRadius = Math.max(...faces.map(f => f.map(v => length(v))).flat());
  const rgb = getRgb(cohort);
  const speed = 15 * (cohort + 1);

  dispatch(positionComponent.add(id, { xPos, yPos, zPos }));
  dispatch(orientationComponent.add(id, { roll: 0, pitch: random(0, Math.PI * 2), yaw: random(0, Math.PI * 2) }));
  dispatch(rotationComponent.add(id, { rollVelocity: random(0.5, 2), pitchVelocity: 0, yawVelocity: 0 }));
  dispatch(velocityComponent.add(id, {
    xVelocity: random(-speed, speed),
    yVelocity: random(-speed, speed),
    zVelocity: 0,
  }));
  dispatch(accelerationComponent.add(id, { xAccel: 0, yAccel: 0, zAccel: 0 }));
  dispatch(healthComponent.add(id, { defence: 1 }));
  dispatch(hitSphereComponent.add(id, { radius: hitSphereRadius }));
  dispatch(polyhedronComponent.add(id, { faces, color: rgb }));
  dispatch(generationComponent.add(id, { cohort }));
};
