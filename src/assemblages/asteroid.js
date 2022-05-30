import { random } from '../libs/number';
import {
  hitSphere as hitSphereComponent,
  orientation as orientationComponent,
  polyhedron as polyhedronComponent,
  position as positionComponent,
  rotation as rotationComponent,
  velocity as velocityComponent,
  health as healthComponent,
  generation as generationComponent,
  appearance as appearanceComponent,
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

export const getRgbForAsteroid = cohort => {
  switch (cohort) {
    case 0:
      return [65, 105, 225];
    case 1:
      return [0, 100,   0];
    case 2:
      return [75, 0, 130];
    default:
      throw new Error('Unknown asteroid generation ' + cohort);
  }
};

export const addAsteroid = (getState, dispatch, { cohort = 0, xPos, yPos, zPos = 0 }) => {
  const id = uid();
  const faces = getFaces(cohort);
  const hitSphereRadius = Math.max(...faces.map(f => f.map(v => length(v))).flat());
  const rgb = getRgbForAsteroid(cohort);
  const speed = 15 * (cohort + 1);

  dispatch(positionComponent.add(id, { xPos, yPos, zPos }));
  dispatch(orientationComponent.add(id, { roll: 0, pitch: random(0, Math.PI * 2), yaw: random(0, Math.PI * 2) }));
  dispatch(rotationComponent.add(id, { rollSpeed: random(0.5, 2), pitchSpeed: 0, yawSpeed: 0 }));
  dispatch(velocityComponent.add(id, {
    xVelocity: random(-speed, speed),
    yVelocity: random(-speed, speed),
    zVelocity: 0,
  }));
  dispatch(healthComponent.add(id, { defence: 1 }));
  dispatch(hitSphereComponent.add(id, { radius: hitSphereRadius }));
  dispatch(polyhedronComponent.add(id, { faces }));
  dispatch(appearanceComponent.add(id, { color: rgb }));
  dispatch(generationComponent.add(id, { cohort }));

  return id;
};
