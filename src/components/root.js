import { combineReducers } from '../libs/store';
import stage from './stage';
import position from './position';
import polyhedron from './polyhedron';
import rotation from './rotation';
import keyPressed from './key-pressed';

export default combineReducers({
  stage,
  position,
  polyhedron,
  rotation,
  keyPressed,
});