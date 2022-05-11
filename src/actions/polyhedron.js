import { ADD_POLYHEDRON, REMOVE_POLYHEDRON, UPDATE_POLYHEDRON } from '../reducers/polyhedron';

export const addPolyhedron = (id, faces) => {
  return {
    type: ADD_POLYHEDRON,
    payload: { id, faces },
  };
};

export const updatePolyhedron = (id, faces) => {
  return {
    type: UPDATE_POLYHEDRON,
    payload: { id, faces },
  };
};

export const removePolyhedron = id => {
  return {
    type: REMOVE_POLYHEDRON,
    payload: { id },
  };
};