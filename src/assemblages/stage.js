import stage from '../components/stage';

export const setStage = (getState, dispatch, { canvasElement, world, id }) => {
  const ctx = canvasElement.getContext('2d');
  const width = canvasElement.width;
  const height = canvasElement.height;

  canvasElement.style.transformOrigin = '0 0';

  const windowResize = () => {
    const scaleX = window.innerWidth / width;
    const scaleY = window.innerHeight / height;
    const scaleToFit = Math.min(scaleX, scaleY);
    canvasElement.style.transform = 'scale(' + scaleToFit + ')';
  }

  windowResize();

  window.addEventListener('resize', windowResize);

  dispatch(stage.add(id, {
    ctx,
    width,
    height,
    localWidth: world.width,
    localHeight: world.height,
  }));

  return () => {
    window.removeEventListener('resize');
  }
}