import { add, toCartesian } from '../libs/vector';
import {
  lineSegment as lineSegmentComponent,
  orientation as orientationComponent,
  position as positionComponent,
  velocity as velocityComponent,
  lifespan as lifespanComponent,
  damage as damageComponent, hitLine as hitLineComponent,
} from '../components';
import { uid } from '../libs/uid';

export const addProjectile = (getState, dispatch, { xPos, yPos, yaw }) => {
  const id = uid();
  const rgb = [255,  0,  0];
  const projectileLength = 4;

  const exitPoint = toCartesian([4, yaw]);
  const projectilePosition = add([xPos, yPos], exitPoint);

  dispatch(positionComponent.add(id, { xPos: projectilePosition[0], yPos: projectilePosition[1] }));
  dispatch(orientationComponent.add(id, { yaw }));
  dispatch(velocityComponent.add(id, { xVelocity: 0, yVelocity: 0, zVelocity: 0 }));
  dispatch(lifespanComponent.add(id, { ttl: 2000 }));
  dispatch(lineSegmentComponent.add(id, { length: projectileLength, pixelWidth: 4, color: rgb,}))
  dispatch(damageComponent.add(id, { attack: 1 }))
  dispatch(hitLineComponent.add(id, { length: projectileLength }));
}