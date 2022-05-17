import positionComponent from '../components/position';
import { range } from '../libs/array';
import { random, randomInt } from '../libs/number';
import orientationComponent from '../components/orientation';
import rotationComponent from '../components/rotation';
import polyhedronComponent from '../components/polyhedron';
import { octasphere } from '../libs/mesh';
import bunny from '../meshes/stanford-bunny.json';
import { multiply } from '../libs/vector';


export const addAsteroids = (getState, dispatch, { minId, maxId, world }) => {
  const halfWidth = world.width / 2;
  const halfHeight = world.height / 2;

  range(maxId - minId + 1, minId).forEach(id => {
    dispatch(positionComponent.add(id, { coords: [randomInt(-halfWidth, halfWidth), randomInt(-halfHeight, halfHeight), 0] }));
    // dispatch(positionComponent.add(id, { coords: [0, 0, 0] }));
    dispatch(orientationComponent.add(id, { roll: 0, pitch: random(0, Math.PI * 2), yaw: random(0, Math.PI * 2) }));
    dispatch(rotationComponent.add(id, { rollVelocity: random(0.5, 2), pitchVelocity: 0, yawVelocity: 0 }));
    const s = random(1, 2)
    dispatch(polyhedronComponent.add(id, {
      faces: octasphere().map(f => f.map(v => multiply(s, v))),
      color: [128, 128, 128],
    }))
  })
}