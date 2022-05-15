import { intersection } from '../libs/array';
import { matrixMultiply, zRotationMatrix } from '../libs/vector';
import rotation from '../components/rotation';
import orientationComponent from '../components/orientation';

export const userControl = stageId => (getState, dispatch, elapsed) => {
  const { orientation, keyPressed } = getState();
  const ids = orientation.allIds;
  const r = elapsed / 1000;

  ids.forEach(id => {
    if (keyPressed.byId['ArrowLeft']) {
      const matrix = matrixMultiply(orientation.byId[id].matrix, zRotationMatrix(r));
      setTimeout(() => {
        dispatch(orientationComponent.update(id, { matrix }))
      }, 0)
    }
  });
}