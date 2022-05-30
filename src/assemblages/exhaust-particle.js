import { uid } from '../libs/uid';
import { random, randomInt } from '../libs/number';
import {
  acceleration as accelerationComponent,
  lifespan as lifespanComponent,
  lineSegment as lineSegmentComponent,
  orientation as orientationComponent,
  position as positionComponent,
  velocity as velocityComponent,
  appearance as appearanceComponent,
} from '../components';
import { toCartesian } from '../libs/vector';

export const addExhaustParticle = (getStat, dispatch, { xPos, yPos, yaw, xVelocity = 0, yVelocity }) => {
  const id = uid();
  const rgb = [255, randomInt(0, 169), 0];
  const ttl = randomInt(200, 400);
  const acceleration = toCartesian([200, yaw]);

  dispatch(positionComponent.add(id, { xPos, yPos }));
  dispatch(orientationComponent.add(id, { yaw }));
  dispatch(velocityComponent.add(id, { xVelocity, yVelocity }));
  dispatch(accelerationComponent.add(id, { xAccel: acceleration[0], yAccel: acceleration[1], zAccel: 0 }));
  dispatch(lifespanComponent.add(id, { ttl, fadeOut: ttl * 0.5 }));
  dispatch(lineSegmentComponent.add(id, { length: 2 }));
  dispatch(appearanceComponent.add(id, { pixelWidth: 4, color: rgb }));
};