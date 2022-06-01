import { intersection } from '../libs/array';
import { fillAndStroke, shade, toPixels, traceCircle } from '../libs/canvas';

export const drawCircle = stageId => (getState, dispatch, deltaTime) => {
  const { circle, appearance, position, stage } = getState();
  const ids = intersection(circle.allIds, position.allIds, appearance.allIds);

  ids.forEach(id => {
    const { radius } = circle.byId[id];
    const { fill, shadowBlur } = appearance.byId[id];
    const { xPos, yPos } = position.byId[id];

    const { ctx, width: stageWidth, height: stageHeight, localWidth, localHeight } = stage.byId[stageId];
    const mapCoordinates = toPixels(stageWidth, stageHeight, localWidth, localHeight);
    const fillStyle = `rgb(${fill.join(',')})`;

    ctx.save();
    shade(ctx, { shadowBlur, shadowColor: fillStyle });
    traceCircle(ctx, mapCoordinates(xPos, yPos), radius);
    fillAndStroke(ctx, { fillStyle });
    ctx.restore();
  });
};