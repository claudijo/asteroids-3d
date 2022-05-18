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
import octahedron from '../meshes/octahedron.json';

export const addAsteroids = (getState, dispatch, { minId, maxId, world }) => {
  const halfWidth = world.width / 2;
  const halfHeight = world.height / 2;

  // dispatch(positionComponent.add(2, { xPos: -30, yPos: 0, zPos: 0 }));
  // dispatch(orientationComponent.add(2, { roll: 0, pitch: random(0, Math.PI * 2), yaw: random(0, Math.PI * 2) }));
  // dispatch(rotationComponent.add(2, { rollVelocity: random(0.5, 2), pitchVelocity: 0, yawVelocity: 0 }));
  // dispatch(velocityComponent.add(2, { xVelocity: random(-15, 15), yVelocity: random(-15, 15), zVelocity: 0}));
  // dispatch(polyhedronComponent.add(2, {
  //   faces: distort(subdivide(icosahedron, 0)).map(face => face.map(vector => multiply(4, vector))),
  //   color: [47,  79,  79]
  // }))
  //
  // dispatch(positionComponent.add(3, { xPos: 0, yPos: 0, zPos: 0 }));
  // dispatch(orientationComponent.add(3, { roll: 0, pitch: random(0, Math.PI * 2), yaw: random(0, Math.PI * 2) }));
  // dispatch(rotationComponent.add(3, { rollVelocity: random(0.5, 2), pitchVelocity: 0, yawVelocity: 0 }));
  // dispatch(polyhedronComponent.add(3, {
  //   faces: distort(subdivide(octahedron, 1)).map(face => face.map(vector => multiply(6, vector))),
  //   color: [47,  79,  79]
  // }))
  //
  // dispatch(positionComponent.add(4, { xPos: 30, yPos: 0, zPos: 0 }));
  // dispatch(orientationComponent.add(4, { roll: 0, pitch: random(0, Math.PI * 2), yaw: random(0, Math.PI * 2) }));
  // dispatch(rotationComponent.add(4, { rollVelocity: random(0.5, 2), pitchVelocity: 0, yawVelocity: 0 }));
  // dispatch(polyhedronComponent.add(4, {
  //   faces: distort(subdivide(icosahedron, 1)).map(face => face.map(vector => multiply(10, vector))),
  //   color: [47,  79,  79]
  // }))

  range(maxId - minId + 1, minId).forEach(id => {
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
