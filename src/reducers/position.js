import { addItem, defaultState, removeItem, updateItem } from '../libs/reducer';

export const ADD_POSITION = 'ADD_POSITION';
export const UPDATE_POSITION = 'UPDATE_POSITION';
export const REMOVE_POSITION = 'REMOVE_POSITION';

export const position = (state = defaultState, action) => {
  const { type, payload: {id, ...data} = {}} = action;
  switch(type) {
    case ADD_POSITION:
      return addItem(state, {id, ...data});
    case UPDATE_POSITION:
      return updateItem(state, {id, ...data});
    case REMOVE_POSITION:
      return removeItem(state, id);
    default:
      return state;
  }
}