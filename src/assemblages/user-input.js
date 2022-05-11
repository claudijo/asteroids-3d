import { clearAllKeyPressed, clearKeyPressed, setKeyPressed } from '../actions/user-input';

export const initUserInput = (dispatch, canvasElement, world) => {
  window.addEventListener('keydown', event => {
    if (event.repeat) {
      return;
    }

    dispatch(setKeyPressed(event.key));
  });

  window.addEventListener('keyup', event => {
    dispatch(clearKeyPressed(event.key));
  });

  window.addEventListener('blur', event => {
    dispatch(clearAllKeyPressed())
  })
};