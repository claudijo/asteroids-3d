import { intersection } from '../libs/array';
import positionComponent from '../components/position';

export const move = stageId => (getState, dispatch, elapsed) => {
  const { position, velocity, stage } = getState();
  const ids = intersection(position.allIds, velocity.allIds);
  const r = elapsed / 1000;

  const {localWidth: width, localHeight: height } = stage.byId[stageId];
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  ids.forEach(id => {
    const { xPos, yPos, zPos } = position.byId[id];
    const { xVelocity, yVelocity, zVelocity } = velocity.byId[id];

    if (xVelocity !== 0) {
      let x = xPos + xVelocity * r;
      if (x < -halfWidth) {
        x += width
      }
      if (x > halfWidth) {
        x -= width
      }
      dispatch(positionComponent.update(id, { xPos: x }));
    }

    if (yVelocity !== 0) {
      let y = yPos + yVelocity * r;

      if (y < -halfHeight) {
        y += height
      }
      if (y > halfHeight) {
        y -= height
      }
      dispatch(positionComponent.update(id, { yPos: y }));
    }

    if (zVelocity !== 0) {
      dispatch(positionComponent.update(id, { zPos: zPos + zVelocity * r }));
    }
  });
};