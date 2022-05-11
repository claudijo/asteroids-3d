import * as stage from '../actions/stage';

export const setStage = (dispatch, canvasElement, world) => {
  dispatch(stage.setStage(canvasElement, {
    width: world.width,
    height: world.height,
  }));
}