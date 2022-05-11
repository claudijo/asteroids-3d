export const length = vector => {
  return Math.sqrt(sum(...vector.map(num => num ** 2)));
};

export const sum = (...nums) => {
  return nums.reduce((acc, num) => acc + num);
}

export const subtract = (vec1, vec2) => {
  return vec1.map((n, i) => n - vec2[i]);
};

export const multiply = (scalar, vector) => {
  return vector.map(n => n * scalar);
};

// Measure vector alignment. Used to check if vectors are perpendicular without
// doing any trigonometry.
export const dot = (vec1, vec2) => {
  const products = vec1.map((n, i) => n * vec2[i]);
  return sum(...products);
};

// Measuring oriented area. Only meaningful for 3d vectors. Cross product is
// orientation dependant and helps keeping track of orientation in our
// computations. Given two input vectors, the cross product outputs a result
// that is perpendicular to both, and how perpendicular they input vectors are
// (ie. how big area the two input vectors span). When drawing 3d on a 2d canvas,
// the cross product helps us decide which polygons are visible
export const cross = (u, v) => {
  const [ux, uy, uz] = u;
  const [vx, vy, vz] = v;
  return [
    uy * vz - uz * vy,
    uz * vx - ux * vz,
    ux * vy - uy * vx,
  ];
};

// extracts the part of any 3D vector pointing in a given direction
export const component = (vector, direction) => {
  return dot(vector, direction) / length(direction);
};

export const vectorTo2d = (vector, rightDir = [1, 0, 0], upDir = [0, 1, 0]) => {
  return [
    component(vector, rightDir),
    component(vector, upDir),
  ];
};

export const faceTo2d = (face, rightDir = [1, 0, 0], upDir = [0, 1, 0]) => {
  return face.map(vertex => vectorTo2d(vertex, rightDir, upDir));
};

// takes a vector and returns another in the same direction but with length 1
export const unit = vector => {
  return multiply(1 / length(vector), vector);
};

// takes a face and gives us a vector perpendicular to it
export const normal = face => {
  return cross(subtract(face[1], face[0]), subtract(face[2], face[0]));
};