// https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection
import { add, cross, dot, length, multiply, subtract } from './vector';

export const isPointInsideSphere = (point, sphere) => {
  // we are using multiplications because is faster than calling Math.pow
  const distance = Math.sqrt((point.x - sphere.x) * (point.x - sphere.x) +
    (point.y - sphere.y) * (point.y - sphere.y) +
    (point.z - sphere.z) * (point.z - sphere.z));
  return distance < sphere.radius;
}

// https://en.wikipedia.org/wiki/M%C3%B6ller%E2%80%93Trumbore_intersection_algorithm
export const rayIntersectsTriangle = (rayOrigin, rayVector, triangle, maxIntersectionPointDistance = Infinity) => {
  const EPSILON = 0.0000001;
  const v0 = triangle[0];
  const v1 = triangle[1];
  const v2 = triangle[2];
  const edge1 = subtract(v1, v0);
  const edge2 = subtract(v2, v0);
  const h = cross(rayVector, edge2);
  const a = dot(edge1, h);
  if (a > -EPSILON && a < EPSILON) {
    return null;    // This ray is parallel to this triangle.
  }
  const f = 1 / a;
  const s = subtract(rayOrigin, v0);
  const u = f * dot(s, h);
  if (u < 0.0 || u > 1.0) {
    return null;
  }
  const q = cross(s, edge1);
  const v = f * dot(rayVector, q);
  if (v < 0.0 || u + v > 1.0) {
    return null;
  }
  // At this stage we can compute t to find out where the intersection point is
  // on the line.
  const t = f * dot(edge2, q);
  if (t > EPSILON && t < maxIntersectionPointDistance) {
    // Return the intersection point
    return add(rayOrigin, multiply(t, rayVector));
  } else {
    return null;
  }
}