import { uid } from '../libs/uid';
import doubleSidedTriangle from '../meshes/double-sided-triangle.json'
import {
  acceleration as accelerationComponent,
  lifespan as lifespanComponent,
  orientation as orientationComponent,
  polyhedron as polyhedronComponent,
  position as positionComponent,
  rotation as rotationComponent,
  velocity as velocityComponent,
} from '../components';
import { random } from '../libs/number';
import { multiply, toCartesian } from '../libs/vector';
import { distort } from '../libs/mesh';

export const addFragment = (getState, dispatch, { xPos, yPos, zPos = 0, rgb = [65, 105, 225]}) => {
  const id = uid()
  const size = random(1.5, 1.8);
  const faces = distort(doubleSidedTriangle.map(face => face.map(vector => multiply(size, vector))));
  const [xVelocity, yVelocity] = toCartesian([random(40, 80), random(0, Math.PI * 2)]);
  const ttl = random(400, 600);

  dispatch(positionComponent.add(id, { xPos, yPos, zPos }));
  dispatch(orientationComponent.add(id, { roll: 0, pitch: random(0, Math.PI * 2), yaw: random(0, Math.PI * 2) }));
  dispatch(rotationComponent.add(id, { rollSpeed: random(6, 10), pitchSpeed: 0, yawSpeed: 0 }));
  dispatch(velocityComponent.add(id, {
    xVelocity,
    yVelocity,
  }));
  dispatch(accelerationComponent.add(id, { xAccel: -xVelocity, yAccel: -yVelocity, zAccel: 0 }))
  dispatch(lifespanComponent.add(id, { ttl, fadeOut: ttl * 0.2 }));
  dispatch(polyhedronComponent.add(id, { faces, color: rgb }));
}