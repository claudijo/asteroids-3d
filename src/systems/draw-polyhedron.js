import { insertAt, intersection, sortedIndex } from '../libs/array';
import { dot, faceTo2d, multiplyMatrixVector, normal, toGlobalFrame, unit, zToGlobal } from '../libs/vector';
import { shadeOf } from '../libs/color';
import { fillAndStroke, toPixels, trace } from '../libs/canvas';

// TODO: Maybe put this is in a component
const light = [1, 2, 3];

const pointOfView = {
  rightDir: [1, 0, 0],
  upDir: [0, 1, 0],
}

export const drawPolyhedron = stageId => (getState, dispatch, elapsed) => {
  const { polyhedron, position, orientation, stage } = getState();
  const ids = intersection(polyhedron.allIds, position.allIds, orientation.allIds);

  const compareFaces = (a, b) => a.face[0][2] - b.face[0][2];
  const sortedSurfaces = [];

  ids.forEach(id => {
    const { faces, color = [0, 0, 0], colors = [] } = polyhedron.byId[id];
    const { roll, pitch, yaw } = orientation.byId[id];

    faces.forEach((face, index) => {
      face = face.map(vector => toGlobalFrame(yaw, pitch, roll, vector));
      const faceColor = colors.length ? colors[index] : color;

      if (true || normal(face)[2] > 0) {
        const index = sortedIndex(sortedSurfaces, { face }, compareFaces);
        insertAt(sortedSurfaces, index, { face, color: faceColor });
      }
    });
  });

  const { ctx, width, height, localWidth, localHeight } = stage.byId[stageId];
  const mapCoordinates = toPixels(width, height, localWidth, localHeight);

  sortedSurfaces.forEach(surface => {
    const { face, color } = surface;
    const shade = dot(unit(normal(face)), unit(light));
    const fillStyle = shadeOf(color, shade);
    // `faceTo2d` involves quite a lot of calculation, but can be skipped entirely
    // if correct behaviour is expected, ie. just remove the z component from the
    // 3d vector
    const polygon = faceTo2d(face, pointOfView.rightDir, pointOfView.upDir)
      .map(([x, y]) => mapCoordinates(x, y));
    trace(ctx, polygon);
    fillAndStroke(ctx, { lineWidth: 1, strokeStyle: fillStyle, fillStyle });
  });


};