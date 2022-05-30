import { intersection } from '../libs/array';
import { fillAndStroke, toPixels, tracePolyLines } from '../libs/canvas';
import { add, multiply } from '../libs/vector';
import characters from '../multilines/characters.json';

export const drawText = stageId => (getState, dispatch, deltaTime) => {
  const { label, position, appearance, stage } = getState();
  const ids = intersection(label.allIds, position.allIds, appearance.allIds);
  const { ctx, width: stageWidth, height: stageHeight, localWidth, localHeight } = stage.byId[stageId];
  const mapCoordinates = toPixels(stageWidth, stageHeight, localWidth, localHeight);

  ids.forEach(id => {
    const { text, size, alignment } = label.byId[id];
    const { color, lineWidth = 1 } = appearance.byId[id];
    const { xPos, yPos } = position.byId[id];

    const alignmentVector = [
      alignment === 'center'
        ? (text.length * size / 2) * -3
        : alignment === 'right'
          ? text.length * size * -3
          : 0,
      0,
      0,
    ];

    const polyLines = [...text].map((char, index) => {
      const positionVector = [xPos + index * 3 * size, yPos];
      const polyLines = characters[char.toUpperCase()] || [];
      return polyLines.map(polyLine => {
        return polyLine.map(vector => {
          const [x, y] = add(multiply(size, vector), positionVector, alignmentVector);
          return mapCoordinates(x, y);
        });
      });
    }).flat();

    const strokeStyle = `rgb(${color.join(',')})`;

    ctx.save();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    tracePolyLines(ctx, polyLines);
    fillAndStroke(ctx, { lineWidth, strokeStyle });
    ctx.restore();
  });

};