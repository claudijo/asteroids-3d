import positionComponent from '../components/position';
import { range } from '../libs/array';
import { random, randomInt } from '../libs/number';
import orientationComponent from '../components/orientation';
import rotationComponent from '../components/rotation';
import polyhedronComponent from '../components/polyhedron';
import { distort, subdivide } from '../libs/mesh';
import { multiply } from '../libs/vector';
import icosahedron from '../meshes/icosahedron.json';
import octahedron from '../meshes/octahedron.json';
import tetrahedron from '../meshes/tetrahedron.json';

const distorted = distort(icosahedron);

// console.log(distorted);

export const addAsteroids = (getState, dispatch, { minId, maxId, world }) => {
  const halfWidth = world.width / 2;
  const halfHeight = world.height / 2;

  dispatch(positionComponent.add(2, { coords: [-30, 0, 0] }));
  dispatch(orientationComponent.add(2, { roll: 0, pitch: random(0, Math.PI * 2), yaw: random(0, Math.PI * 2) }));
  dispatch(rotationComponent.add(2, { rollVelocity: random(0.5, 2), pitchVelocity: 0, yawVelocity: 0 }));
  dispatch(polyhedronComponent.add(2, {
    faces: distort(subdivide(icosahedron, 0)).map(face => face.map(vector => multiply(4, vector))),
    color: [47,  79,  79]
  }))

  dispatch(positionComponent.add(3, { coords: [0, 0, 0] }));
  dispatch(orientationComponent.add(3, { roll: 0, pitch: random(0, Math.PI * 2), yaw: random(0, Math.PI * 2) }));
  dispatch(rotationComponent.add(3, { rollVelocity: random(0.5, 2), pitchVelocity: 0, yawVelocity: 0 }));
  dispatch(polyhedronComponent.add(3, {
    faces: distort(subdivide(octahedron, 1)).map(face => face.map(vector => multiply(6, vector))),
    color: [47,  79,  79]
  }))

  dispatch(positionComponent.add(4, { coords: [30, 0, 0] }));
  dispatch(orientationComponent.add(4, { roll: 0, pitch: random(0, Math.PI * 2), yaw: random(0, Math.PI * 2) }));
  dispatch(rotationComponent.add(4, { rollVelocity: random(0.5, 2), pitchVelocity: 0, yawVelocity: 0 }));
  dispatch(polyhedronComponent.add(4, {
    faces: distort(subdivide(icosahedron, 1)).map(face => face.map(vector => multiply(10, vector))),
    color: [47,  79,  79]
  }))

  return;

  // range(maxId - minId + 1, minId).forEach(id => {
  range(1).forEach(id => {
    // dispatch(positionComponent.add(id, { coords: [randomInt(-halfWidth, halfWidth), randomInt(-halfHeight, halfHeight), 0] }));
    dispatch(positionComponent.add(id, { coords: [20, 0, 0] }));
    dispatch(orientationComponent.add(id, { roll: 0, pitch: random(0, Math.PI * 2), yaw: random(0, Math.PI * 2) }));
    // dispatch(orientationComponent.add(id, { roll: 0, pitch: 0, yaw: 0 }));
    dispatch(rotationComponent.add(id, { rollVelocity: random(0.5, 2), pitchVelocity: 0, yawVelocity: 0 }));
    const s = random(1, 2)
    dispatch(polyhedronComponent.add(id, {
      faces: subdivide(icosahedron, 1).map(face => face.map(vector => multiply(10, vector))),
      // color: [128, 128, 128],
      color: [255, 0, 0]
    }))
  })
}

// a = [0.9428090415820634, 0, -0.3333333333333333]
// b = [-0.4714045207910317, 0.816496580927726, -0.3333333333333333]
// c = [-0.4714045207910317, -0.816496580927726, -0.3333333333333333]
// d = [0, 0, 1]