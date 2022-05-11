import { createReducer } from '../libs/reducer';

const rotation = createReducer('rotation');

export const { ADD_ROTATION, UPDATE_ROTATION, REMOVE_ROTATION } = rotation.actionTypes;

export default rotation;
