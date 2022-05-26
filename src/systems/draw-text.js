import { intersection } from '../libs/array';
import { fillAndStroke, toPixels, tracePolyLines } from '../libs/canvas';
import { add, multiply } from '../libs/vector';
import characters from '../multilines/characters.json';

export const drawText = stageId => (getState, dispatch, deltaTime) => {
  const { label, position, stage } = getState();
  const ids = intersection(label.allIds, position.allIds);
  const { ctx, width: stageWidth, height: stageHeight, localWidth, localHeight } = stage.byId[stageId];
  const mapCoordinates = toPixels(stageWidth, stageHeight, localWidth, localHeight);

  ids.forEach(id => {
    const { text, size, alignment, color, lineWidth = 1 } = label.byId[id];
    const { xPos, yPos } = position.byId[id];

    const polyLines = [...text].map((char, index) => {
      const positionVector = [xPos + index * 3 * size, yPos];
      const polyLines = characters[char.toUpperCase()] || [];
      return polyLines.map(polyLine => {
        return polyLine.map(vector => {
          const [x, y] = add(multiply(size, vector), positionVector);
          return mapCoordinates(x, y);
        });
      });
    }).flat();

    const strokeStyle = `rgb(${color.join(',')})`;

    ctx.save();
    ;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    tracePolyLines(ctx, polyLines);
    fillAndStroke(ctx, { lineWidth, strokeStyle });
    ctx.restore();
  });

};