import { range } from '../libs/array';
import { random, randomInt } from '../libs/number';
import { hitSphere as hitSphereComponent, orientation as orientationComponent } from '../components';
import { polyhedron as polyhedronComponent } from '../components';
import { position as positionComponent } from '../components';
import { rotation as rotationComponent } from '../components';
import { velocity as velocityComponent } from '../components';
import { health as healthComponent } from '../components';
import { distort, subdivide } from '../libs/mesh';
import { length, multiply } from '../libs/vector';
import icosahedron from '../meshes/icosahedron.json';
import { uid } from '../libs/uid';

// Small asteroid: distort(subdivide(icosahedron, 0))
// Medium asteroid: distort(subdivide(octahedron, 1))
// Large asteroid: distort(subdivide(icosahedron, 1))

export const addAsteroids = (getState, dispatch, { count = 3, world }) => {
  const halfWidth = world.width / 2;
  const halfHeight = world.height / 2;

  range(count).forEach(() => {
    const id = uid();
    const xPos = randomInt(-halfWidth, halfWidth);
    const yPos = randomInt(-halfHeight, halfHeight);
    const zPos = 0;
    const faces = distort(subdivide(icosahedron, 1)).map(face => face.map(vector => multiply(10, vector)));
    const hitSphereRadius = Math.max(...faces.map(f => f.map(v => length(v))).flat());
    const rgb = [47, 79, 79];

    dispatch(positionComponent.add(id, { xPos, yPos, zPos }));
    dispatch(orientationComponent.add(id, { roll: 0, pitch: random(0, Math.PI * 2), yaw: random(0, Math.PI * 2) }));
    dispatch(rotationComponent.add(id, { rollVelocity: random(0.5, 2), pitchVelocity: 0, yawVelocity: 0 }));
    dispatch(velocityComponent.add(id, { xVelocity: random(-15, 15), yVelocity: random(-15, 15), zVelocity: 0 }));
    dispatch(healthComponent.add(id, { defence: 1 }));
    dispatch(hitSphereComponent.add(id, { radius: hitSphereRadius }));
    dispatch(polyhedronComponent.add(id, { faces, color: rgb }));
  });
};
