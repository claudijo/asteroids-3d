import { CLEAR_ALL_KEY_PRESSED, CLEAR_KEY_PRESSED, SET_KEY_PRESSED } from '../reducers/user-input';

export const setKeyPressed = key => {
  return {
    type: SET_KEY_PRESSED,
    payload: { key }
  }
}

export const clearKeyPressed = key => {
  return {
    type: CLEAR_KEY_PRESSED,
    payload: { key }
  }
}

export const clearAllKeyPressed = () => {
  return {
    type: CLEAR_ALL_KEY_PRESSED,
  }
}