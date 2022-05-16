import { sum, zip } from './array';

export const length = vector => {
  return Math.sqrt(sum(...vector.map(num => num ** 2)));
};

export const add = (...vectors) => {
  return vectors[0].map((_, i) => {
    return vectors.reduce((acc, vector) => {
      return acc + vector[i];
    }, 0);
  });
};

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

export const projectXy = v => {
  const [x, y] = v;
  return [x, y]
}

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

export const linearCombination = (scalars, ...vectors) => {
  const scaled = scalars.map((s, i) => multiply(s, vectors[i]));
  return add(...scaled);
};

// Matrix columns expected to be laid out as rows in a two dimensional array
export const multiplyMatrixVector = (matrix, vector) => {
  return linearCombination(vector, ...zip(...matrix));
};

export const matrixMultiply = (a, b) => {
  return a.map(row => {
    return zip(...b).map(col => {
      return dot(row, col);
    });
  });
};

export const zRotationMatrix = r => [
  [Math.cos(r), -Math.sin(r), 0],
  [Math.sin(r), Math.cos(r), 0],
  [0, 0, 1],
];

export const xRotationMatrix = r => [
  [1, 0, 0],
  [0, Math.cos(r), -Math.sin(r)],
  [0, Math.sin(r), Math.cos(r)],
];

export const yRotationMatrix = r => [
  [Math.cos(r), 0, Math.sin(r)],
  [0, 1, 0],
  [-Math.sin(r), 0, Math.cos(r)],
];

export const rotationMatrix = (rx, ry, rz) => {
  // return [
  //   [0, 0, 1],
  //   [Math.sin(rx) * Math.cos(rz) + Math.cos()],
  //   [], [], []
  // ]
}

export const translate3d = (translation, target) => {
  const [a, b, c] = translation;
  const [x,y,z] = target;
  const matrix = [
    [1,0,0,0,a],
    [0,1,0,0,b],
    [0,0,1,0,c],
    [0,0,0,0,1]
  ];
  const vector = [x, y, z, 1];
  return multiplyMatrixVector(matrix, vector);
}

export const zToGlobal = (yaw, vector) => {
  const matrix = [
    [Math.cos(yaw), -Math.sin(yaw), 0],
    [Math.sin(yaw), Math.cos(yaw), 0],
    [0, 0, 1]
  ]
  return multiplyMatrixVector(matrix, vector);
}

export const toGlobalFrame = (yaw, pitch, roll , vector) => {
  const matrix = [
    [
      Math.cos(yaw) * Math.cos(pitch),
      Math.cos(yaw) * Math.sin(pitch) * Math.sin(roll) - Math.sin(yaw) * Math.cos(roll),
      Math.cos(yaw) * Math.sin(pitch) * Math.cos(roll) + Math.sin(yaw) * Math.sin(roll),
    ], [
      Math.sin(yaw) * Math.cos(pitch),
      Math.sin(yaw) * Math.sin(pitch) * Math.sin(roll) + Math.cos(yaw) * Math.cos(roll),
      Math.sin(yaw) * Math.sin(pitch) * Math.cos(roll) - Math.cos(yaw) * Math.sin(roll),
    ], [
      -Math.sin(pitch),
      Math.cos(pitch) * Math.sin(roll),
      Math.cos(pitch) * Math.cos(roll)
    ]
  ]
  return multiplyMatrixVector(matrix, vector);
}