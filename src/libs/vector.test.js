import { matrixMultiply } from './vector';

test('matrix by matrix multiplication', () => {
  expect(matrixMultiply([[1, 1, 0], [1, 0, 1], [1, -1, 1]], [[0, 2, 1], [0, 1, 0], [1, 0, -1]]))
    .toStrictEqual([[0, 3, 1], [1, 2, 0], [1, 1, 0]]);

  expect(matrixMultiply([[1, 2], [3, 4]], [[0, -1], [1, 0]]))
    .toStrictEqual([[2, -1], [4, -3]]);

  expect(matrixMultiply([[-1, -1, 0], [-2, 1, 2], [1, 0, -1]], [[1], [1], [1]]))
    .toStrictEqual(([[-2], [1], [0]]));

  expect(matrixMultiply([[1,-2,0],[-1,-2,2]], [[2,0,-1,2],[0,-2,2,-2],[-1,-1,2,1]]))
    .toStrictEqual([[2,4,-5,6], [-4,2,1,4]])
});