import { combineReducers } from '../libs/store';
import { stage } from './stage';
import { position } from './position';
import { polyhedron } from './polyhedron';
import { userInput } from './user-input';

export default combineReducers({
  stage,
  position,
  polyhedron,
  userInput,
});