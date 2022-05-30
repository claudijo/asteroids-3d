import { add, length, multiply, toCartesian } from '../libs/vector';
import {
  lineSegment as lineSegmentComponent,
  orientation as orientationComponent,
  position as positionComponent,
  velocity as velocityComponent,
  lifespan as lifespanComponent,
  damage as damageComponent,
  hitLine as hitLineComponent,
  acceleration as accelerationComponent, appearance as appearanceComponent,
} from '../components';
import { uid } from '../libs/uid';

export const addProjectile = (getState, dispatch, { xPos, yPos, yaw, xVelocity = 0, yVelocity = 0 }) => {
  const id = uid();
  const rgb = [255,  0,  0];
  const projectileLength = 4;

  const exitPoint = toCartesian([4, yaw]);
  const projectilePosition = add([xPos, yPos], exitPoint);
  const acceleration = toCartesian([200, yaw]);
  const speedLimit = length([xVelocity, yVelocity]) + 150;

  dispatch(positionComponent.add(id, { xPos: projectilePosition[0], yPos: projectilePosition[1] }));
  dispatch(orientationComponent.add(id, { yaw }));
  dispatch(velocityComponent.add(id, { xVelocity, yVelocity }));
  dispatch(accelerationComponent.add(id, { xAccel: acceleration[0], yAccel: acceleration[1], zAccel: 0, speedLimit }))
  dispatch(lifespanComponent.add(id, { ttl: 1200 }));
  dispatch(lineSegmentComponent.add(id, { length: projectileLength}))
  dispatch(appearanceComponent.add(id, { pixelWidth: 4, color: rgb }));
  dispatch(damageComponent.add(id, { attack: 1 }))
  dispatch(hitLineComponent.add(id, { length: projectileLength }));
}