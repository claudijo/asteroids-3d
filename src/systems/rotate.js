import { intersection } from '../libs/array';
import { matrixMultiply, xRotationMatrix, yRotationMatrix, zRotationMatrix } from '../libs/vector';
import orientationComponent from '../components/orientation';

export const rotate = stageId => (getState, dispatch, elapsed) => {
  const { orientation, rotation } = getState();
  const ids = intersection(orientation.allIds, rotation.allIds);
  const r = elapsed / 1000;

  ids.forEach(id => {
    let { matrix } = orientation.byId[id];
    const { vx, vy, vz } = rotation.byId[id];

    if (vx !== 0) {
      matrix = matrixMultiply(matrix, xRotationMatrix(r * vx))
    }

    if (vy !== 0) {
      matrix = matrixMultiply(matrix, yRotationMatrix(r * vy))
    }

    if (vz !== 0) {
      matrix = matrixMultiply(matrix, zRotationMatrix(r * vz));
    }

    dispatch(orientationComponent.update(id, { matrix }))
  })
}