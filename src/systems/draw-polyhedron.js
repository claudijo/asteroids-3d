import { insertAt, intersection, sortedIndex } from '../libs/array';
import {
  add,
  dot,
  faceTo2d,
  normal,
  toGlobalFrame,
  unit,
} from '../libs/vector';
import { shadeOf } from '../libs/color';
import { fillAndStroke, toPixels, tracePolygon } from '../libs/canvas';

// TODO: Maybe put this is in a component
const light = [-1, 2, 4];

const pointOfView = {
  rightDir: [1, 0, 0],
  upDir: [0, 1, 0],
}

export const drawPolyhedron = stageId => (getState, dispatch, deltaTime) => {
  const { polyhedron, position, orientation, appearance, stage } = getState();
  const ids = intersection(polyhedron.allIds, position.allIds, orientation.allIds, appearance.allIds);

  const compareFaces = (a, b) => {
    if (a.id !== b.id) {
      return b.id - a.id;
    }
    return a.face[0][2] - b.face[0][2];
  }

  const sortedSurfaces = [];

  ids.forEach(id => {
    const { faces } = polyhedron.byId[id];
    const { color } = appearance.byId[id];
    const { roll, pitch, yaw } = orientation.byId[id];

    faces.forEach((face, index) => {
      face = face.map(vector => toGlobalFrame(yaw, pitch, roll, vector));

      if (normal(face)[2] > 0) {
        const index = sortedIndex(sortedSurfaces, { id, face }, compareFaces);
        insertAt(sortedSurfaces, index, { id, face, color });
      }
    });
  });

  const { ctx, width, height, localWidth, localHeight } = stage.byId[stageId];
  const mapCoordinates = toPixels(width, height, localWidth, localHeight);

  sortedSurfaces.forEach(surface => {
    const { id, face, color } = surface;
    const shade = dot(unit(normal(face)), unit(light));
    const fillStyle = shadeOf(color, shade);
    const { xPos, yPos, zPos } = position.byId[id];

    const transformed = face.map(vector => {
      return add([xPos, yPos, zPos], vector)
    });

    // `faceTo2d` involves quite a lot of calculation, but can be skipped entirely
    // if current behaviour is expected, ie. just remove the z component from the
    // 3d vector
    const polygon = faceTo2d(transformed, pointOfView.rightDir, pointOfView.upDir)
      .map(([x, y]) => mapCoordinates(x, y));

    ctx.save();
    tracePolygon(ctx, polygon);
    fillAndStroke(ctx, { lineWidth: 1, strokeStyle: fillStyle, fillStyle });
    ctx.restore();
  });
};