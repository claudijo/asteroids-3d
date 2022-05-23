import { combineReducers } from '../libs/store';
import { createReducer } from '../libs/reducer';

export const lifespan = createReducer('lifeSpan');
export const lineSegment = createReducer('lineSegment');
export const position = createReducer('position');
export const polyhedron = createReducer('polyhedron');
export const rotation = createReducer('rotation');
export const orientation = createReducer('orientation');
export const velocity = createReducer('velocity');
export const acceleration = createReducer('acceleration')
export const stage = createReducer('stage');
export const health = createReducer('health');
export const damage = createReducer('damage');
export const hitSphere = createReducer('hitSphere');
export const hitLine = createReducer('hitLine')
export const generation = createReducer('generation');
export const thrust = createReducer('thrust');
export const friction = createReducer('friction');

export default combineReducers({
  stage,
  position,
  polyhedron,
  rotation,
  orientation,
  velocity,
  acceleration,
  lineSegment,
  lifespan,
  health,
  damage,
  hitSphere,
  hitLine,
  generation,
  thrust,
  friction,
});