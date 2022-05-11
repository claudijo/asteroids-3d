import { next } from '../libs/incrementer';
import shipFaces from '../wireframes/ship.json';
import { addPosition } from '../actions/position';
import { addPolyhedron } from '../actions/polyhedron';

export const addShip = dispatch => {
  const id = next();

  dispatch(addPosition(id, [0,0,0]));
  // dispatch(setRotation(id, [1,0,0]));
  // dispatch(setVelocity(id, [0,0,0]));
  // dispatch(setAcceleration(id, [0,0,0]));
  // dispatch(setAppearance(id, {
  //   fillStyle: 'Blue'
  // }))
  dispatch(addPolyhedron(id, shipFaces));
}