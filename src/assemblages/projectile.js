import { add, toCartesian } from '../libs/vector';
import {
  lineSegment as lineSegmentComponent,
  orientation as orientationComponent,
  position as positionComponent,
  velocity as velocityComponent,
  lifespan as lifespanComponent,
  damage as damageComponent,
  hitLine as hitLineComponent,
  acceleration as accelerationComponent,
} from '../components';
import { uid } from '../libs/uid';

export const addProjectile = (getState, dispatch, { xPos, yPos, yaw }) => {
  const id = uid();
  const rgb = [255,  0,  0];
  const projectileLength = 4;

  const exitPoint = toCartesian([4, yaw]);
  const projectilePosition = add([xPos, yPos], exitPoint);
  const acceleration = toCartesian([200, yaw]);

  dispatch(positionComponent.add(id, { xPos: projectilePosition[0], yPos: projectilePosition[1] }));
  dispatch(orientationComponent.add(id, { yaw }));
  dispatch(velocityComponent.add(id, { xVelocity: 0, yVelocity: 0, zVelocity: 0 }));
  dispatch(accelerationComponent.add(id, { xAccel: acceleration[0], yAccel: acceleration[1], zAccel: 0 }))
  dispatch(lifespanComponent.add(id, { ttl: 1200 }));
  dispatch(lineSegmentComponent.add(id, { length: projectileLength, pixelWidth: 4, color: rgb,}))
  dispatch(damageComponent.add(id, { attack: 1 }))
  dispatch(hitLineComponent.add(id, { length: projectileLength }));
}