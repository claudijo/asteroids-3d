import { intersection } from '../libs/array';
import { fillAndStroke, shade, toPixels, traceLine } from '../libs/canvas';
import { add, toCartesian } from '../libs/vector';

export const drawLineSegment = stageId => (getState, dispatch, deltaTime) => {
  const { lineSegment, position, orientation, stage } = getState();
  const ids = intersection(lineSegment.allIds, position.allIds, orientation.allIds);



  ids.forEach(id => {
    const { length, width, color = [0, 0, 0] } = lineSegment.byId[id];
    const { yaw } = orientation.byId[id];

    const { ctx, width: stageWidth, height: stageHeight, localWidth, localHeight } = stage.byId[stageId];
    const mapCoordinates = toPixels(stageWidth, stageHeight, localWidth, localHeight);

    const start = position.byId[id];
    const end = add(toCartesian([length, yaw]), [start.xPos, start.yPos]);
    const rgb = `rgb(${color.join(',')})`;

    ctx.save();
    traceLine(ctx, mapCoordinates(start.xPos, start.yPos), mapCoordinates(...end));
    fillAndStroke(ctx, { lineWidth: width, strokeStyle: rgb });
    ctx.restore();
  });
};