import stage from '../components/stage';
import { GAME_PLAY_STAGE_ID } from '../constants';

export const setStage = (dispatch, { canvasElement, world, id }) => {
  const ctx = canvasElement.getContext('2d');
  const width = canvasElement.width;
  const height = canvasElement.height;

  dispatch(stage.add(id, {
    ctx,
    width,
    height,
    localWidth: world.width,
    localHeight: world.height,
  }));
}