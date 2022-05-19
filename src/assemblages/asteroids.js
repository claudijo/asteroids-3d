import positionComponent from '../components/position';
import { range } from '../libs/array';
import { random, randomInt } from '../libs/number';
import orientationComponent from '../components/orientation';
import rotationComponent from '../components/rotation';
import polyhedronComponent from '../components/polyhedron';
import velocityComponent from '../components/velocity';
import { distort, subdivide } from '../libs/mesh';
import { multiply } from '../libs/vector';
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

    dispatch(positionComponent.add(id, { xPos: randomInt(-halfWidth, halfWidth), yPos: randomInt(-halfHeight, halfHeight), zPos: 0 }));
    dispatch(orientationComponent.add(id, { roll: 0, pitch: random(0, Math.PI * 2), yaw: random(0, Math.PI * 2) }));
    dispatch(rotationComponent.add(id, { rollVelocity: random(0.5, 2), pitchVelocity: 0, yawVelocity: 0 }));
    dispatch(velocityComponent.add(id, { xVelocity: random(-15, 15), yVelocity: random(-15, 15), zVelocity: 0}));
    dispatch(polyhedronComponent.add(id, {
      faces: distort(subdivide(icosahedron, 1)).map(face => face.map(vector => multiply(10, vector))),
      color: [47,  79,  79]
    }))
  })
}
