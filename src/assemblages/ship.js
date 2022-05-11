import shipFaces from '../wireframes/ship.json';
import rotation from '../components/rotation';
import position from '../components/position';
import polyhedron from '../components/polyhedron';

export const addShip = (dispatch, { id }) => {
  dispatch(position.add(id, { coords: [0, 0, 0] }));
  dispatch(rotation.add(id, { matrix: [0, 0, 0] }));
  // dispatch(setVelocity(id, [0,0,0]));
  // dispatch(setAcceleration(id, [0,0,0]));
  // dispatch(setAppearance(id, {
  //   fillStyle: 'Blue'
  // }))
  dispatch(polyhedron.add(id, { faces: shipFaces }));
};