export const SET_KEY_PRESSED = 'SET_KEY_PRESSED';
export const CLEAR_KEY_PRESSED = 'CLEAR_KEY_PRESSED';
export const CLEAR_ALL_KEY_PRESSED = 'CLEAR_ALL_KEY_PRESSED'

const defaultState = {
  keyPressed: {},
}

export const userInput = (state = defaultState, action) => {
  const { type, payload: { key } = {} } = action;
  switch (type) {
    case SET_KEY_PRESSED:
      return {
        ...state,
        keyPressed: {
          ...state.keyPressed,
          [key]: true,
        }
      }
    case CLEAR_KEY_PRESSED:
      const { [key]: _, ...keyPressed } = state.keyPressed;
      return {
        ...state,
        keyPressed,
      }
    case CLEAR_ALL_KEY_PRESSED:
      return {
        ...state,
        keyPressed: {},
      }
    default:
      return state;
  }
}

