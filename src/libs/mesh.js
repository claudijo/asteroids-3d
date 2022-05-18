import { length, middle, multiply, unit } from './vector';
import { random } from './number';

export const subdivide = (shape, level = 1) => {
  if (level === 0) {
    return shape;
  }

  const faces = [];

  shape.forEach(face => {
    // Replace each triangular face by four new triangular faces
    const aMiddle = unit(middle(face[0], face[1]));
    const bMiddle = unit(middle(face[1], face[2]));
    const cMiddle = unit(middle(face[2], face[0]));

    faces.push([face[0], aMiddle, cMiddle]);
    faces.push([face[1], bMiddle, aMiddle]);
    faces.push([face[2], cMiddle, bMiddle]);
    faces.push([aMiddle, bMiddle, cMiddle]);
  });

  return subdivide(faces, level - 1);
};

export const distort = shape => {
  const vectorLengths = {};

  return shape.map(face => {
    return face.map(vector => {
      const key = JSON.stringify(vector);
      let vectorLength = vectorLengths[key];
      if (typeof vectorLength === 'undefined') {
        vectorLength = length(vector) * random(0.7, 1.2);
        vectorLengths[key] = vectorLength;
      }

      return multiply(vectorLength, vector);
    });
  });
};



