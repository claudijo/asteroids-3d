import { ADD_POSITION, REMOVE_POSITION, UPDATE_POSITION } from '../reducers/position';

export const addPosition = (id, position) => {
  return {
    type: ADD_POSITION,
    payload: { id, position },
  };
};

export const updatePosition = (id, position) => {
  return {
    type: UPDATE_POSITION,
    payload: { id, position },
  };
};

export const removePosition = id => {
  return {
    type: REMOVE_POSITION,
    payload: { id },
  };
};