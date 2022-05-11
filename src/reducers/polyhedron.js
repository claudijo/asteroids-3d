import { addItem, defaultState, removeItem, updateItem } from '../libs/reducer';

export const ADD_POLYHEDRON = 'ADD_POLYHEDRON';
export const UPDATE_POLYHEDRON = 'UPDATE_POLYHEDRON';
export const REMOVE_POLYHEDRON = 'REMOVE_POLYHEDRON';

export const polyhedron = (state = defaultState, action) => {
  const { type, payload: { id, ...data } = {} } = action;
  switch (type) {
    case ADD_POLYHEDRON:
      return addItem(state, { id, ...data });
    case UPDATE_POLYHEDRON:
      return updateItem(state, { id, ...data });
    case REMOVE_POLYHEDRON:
      return removeItem(state, { id });
    default:
      return state;
  }
};