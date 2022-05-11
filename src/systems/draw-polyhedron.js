import { insertAt, intersection, sortedIndex } from '../libs/array';
import { dot, faceTo2d, normal, unit } from '../libs/vector';
import { shadeOf } from '../libs/color';
import { fillAndStroke, toPixels, trace } from '../libs/canvas';
import { GAME_PLAY_STAGE_ID } from '../constants';

// TODO: Maybe put this is in a component
const light = [1, 2, 3];

const pointOfView = {
  rightDir: [1, 0, 0],
  upDir: [0, 1, 0],
}

export const drawPolyhedron = (getState, dispatch, elapsed) => {
  const { polyhedron, position, stage } = getState();
  const ids = intersection(polyhedron.allIds, position.allIds);

  const compareFaces = (a, b) => a[0][2] - b[0][2];
  const sortedFaces = [];

  ids.forEach(id => {
    const { faces } = polyhedron.byId[id];
    faces.forEach(face => {
      // TODO: Apply rotation before checking if face is perpendicular towards "camera"
      if (normal(face)[2] > 0) {
        const index = sortedIndex(sortedFaces, face, compareFaces);
        insertAt(sortedFaces, index, face);
      }
    });
  });

  const { ctx, width, height, localWidth, localHeight } = stage.byId[GAME_PLAY_STAGE_ID];
  const mapCoordinates = toPixels(width, height, localWidth, localHeight);

  sortedFaces.forEach(face => {
    const shade = dot(unit(normal(face)), unit(light));
    const fillStyle = shadeOf([0, 0, 255], shade);
    const polygon = faceTo2d(face, pointOfView.rightDir, pointOfView.upDir)
      .map(([x, y]) => mapCoordinates(x, y));
    trace(ctx, polygon);
    fillAndStroke(ctx, { lineWidth: 1, strokeStyle: fillStyle, fillStyle });
  });


};