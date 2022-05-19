import { toCartesian } from '../libs/vector';
import {
  lineSegment as lineSegmentComponent,
  orientation as orientationComponent,
  position as positionComponent,
  velocity as velocityComponent,
  lifespan as lifespanComponent,
} from '../components';
import { uid } from '../libs/uid';

export const addProjectile = (getState, dispatch, { xPos, yPos, yaw }) => {
  const projectileId = uid();
  const [xVelocity, yVelocity] = toCartesian([50, yaw])

  dispatch(positionComponent.add(projectileId, { xPos, yPos }));
  dispatch(orientationComponent.add(projectileId, { yaw }));
  dispatch(velocityComponent.add(projectileId, { xVelocity, yVelocity }));
  dispatch(lifespanComponent.add(projectileId, { ttl: 2000 }));
  dispatch(lineSegmentComponent.add(projectileId, {
    length: 4,
    width: 6,
    color: [255,  0,  0],
  }))
}