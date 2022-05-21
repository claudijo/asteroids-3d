import { toCartesian } from '../libs/vector';
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
  const [xVelocity, yVelocity] = toCartesian([60, yaw]);
  const rgb = [255,  0,  0];
  const projectileLength = 4;

  dispatch(positionComponent.add(id, { xPos, yPos }));
  dispatch(orientationComponent.add(id, { yaw }));
  dispatch(velocityComponent.add(id, { xVelocity, yVelocity }));
  dispatch(lifespanComponent.add(id, { ttl: 2000 }));
  dispatch(lineSegmentComponent.add(id, { length: projectileLength, pixelWidth: 4, color: rgb,}))
  dispatch(damageComponent.add(id, { attack: 1 }))
  dispatch(hitLineComponent.add(id, { length: projectileLength }));
}