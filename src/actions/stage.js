import { SET_STAGE } from '../reducers/stage';

export const setStage = (canvas, world) => {
  const ctx = canvas.getContext('2d');

  return {
    type: SET_STAGE,
    payload: {
      ctx,
      width: canvas.width,
      height: canvas.height,
      worldWidth: world.width,
      worldHeight: world.height,
    },
  }
}