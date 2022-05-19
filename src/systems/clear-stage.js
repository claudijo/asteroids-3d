export const clearStage = stageId => (getState, dispatch, deltaTime) => {
  const { stage } = getState();
  const { ctx, width, height } = stage.byId[stageId];
  ctx.clearRect(0, 0, width, height);
}