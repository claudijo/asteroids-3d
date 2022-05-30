import { intersection } from '../libs/array';
import { fillAndStroke, toPixels, traceLine } from '../libs/canvas';
import { add, toCartesian } from '../libs/vector';

export const drawLineSegment = stageId => (getState, dispatch, deltaTime) => {
  const { lineSegment, appearance, position, orientation, stage } = getState();
  const ids = intersection(lineSegment.allIds, position.allIds, orientation.allIds, appearance.allIds);

  ids.forEach(id => {
    const { length } = lineSegment.byId[id];
    const { pixelWidth, color = [0, 0, 0] } = appearance.byId[id];
    const { yaw } = orientation.byId[id];

    const { ctx, width: stageWidth, height: stageHeight, localWidth, localHeight } = stage.byId[stageId];
    const mapCoordinates = toPixels(stageWidth, stageHeight, localWidth, localHeight);

    const start = position.byId[id];
    const end = add(toCartesian([length, yaw]), [start.xPos, start.yPos]);
    const rgb = `rgb(${color.join(',')})`;

    ctx.save();
    traceLine(ctx, mapCoordinates(start.xPos, start.yPos), mapCoordinates(...end));
    fillAndStroke(ctx, { lineWidth: pixelWidth, strokeStyle: rgb });
    ctx.restore();
  });
};