import keyPressed from '../components/key-pressed';

export const initUserInput = (dispatch) => {
  window.addEventListener('keydown', event => {
    if (event.repeat) {
      return;
    }

    dispatch(keyPressed.add(event.code, { key: event.key }))
  });

  window.addEventListener('keyup', event => {
    dispatch(keyPressed.remove(event.code));
  });

  window.addEventListener('blur', event => {
    // dispatch(keyPressed.clear())
  });
};