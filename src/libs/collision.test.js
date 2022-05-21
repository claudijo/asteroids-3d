import { rayIntersectsTriangle } from './collision';

test('ray intersecting triangle', () => {
  const triangle = [[5, 5, 5], [10, 15, 4], [15, 5, 3]];
  const rayOrigin = [9, 5, -5];
  const rayVector = [0.1,0.1,0.8];
  expect(rayIntersectsTriangle(rayOrigin, rayVector, triangle))
    .toStrictEqual([ 10.121951219512194, 6.121951219512195, 3.975609756097562 ])
});