import { combineReducers } from '../libs/store';
import { createReducer } from '../libs/reducer';

export const lifespan = createReducer('lifeSpan');
export const lineSegment = createReducer('lineSegment');
export const position = createReducer('position');
export const polyhedron = createReducer('polyhedron');
export const rotation = createReducer('rotation');
export const orientation = createReducer('orientation');
export const velocity = createReducer('velocity');
export const stage = createReducer('stage');

export default combineReducers({
  stage,
  position,
  polyhedron,
  rotation,
  orientation,
  velocity,
  lineSegment,
  lifespan,
});