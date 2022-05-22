import { intersection } from '../libs/array';
import { add, toCartesian } from '../libs/vector';
import { isPointInsideSphere, rayIntersectsTriangle } from '../libs/collision';
import { health as healthComponent } from '../components';
import { lifespan as lifespanComponent } from '../components';

export const projectileDamage = stageId => (getState, dispatch, deltaTime) => {
  const { position, orientation, damage, hitLine, health, hitSphere, polyhedron, lifespan } = getState();
  const projectileIds = intersection(position.allIds, orientation.allIds, damage.allIds, hitLine.allIds, lifespan.allIds);
  const targetIds = intersection(position.allIds, orientation.allIds, health.allIds, hitSphere.allIds, polyhedron.allIds);

  // Broad phase collision detection
  const projectileHeads = projectileIds.map(id => {
    const { xPos, yPos } = position.byId[id];
    const { yaw } = orientation.byId[id];
    const { length } = hitLine.byId[id];
    const coords = [...add(toCartesian([length, yaw]), [xPos, yPos]), 0];
    return { coords, id };
  });

  const broadCollisions = [];

  projectileHeads.forEach(head => {
    const { coords } = head;
    targetIds.forEach(id => {
      const { xPos: x, yPos: y, zPos: z } = position.byId[id];
      const { radius } = hitSphere.byId[id];
      if (isPointInsideSphere({ x: coords[0], y: coords[1], z: coords[2] }, { x, y, z, radius })) {
        broadCollisions.push({ targetId: id, projectileId: head.id });
      }
    });
  });

  // Narrow phase collision detection
  broadCollisions.forEach(({ projectileId, targetId }) => {
    const { xPos, yPos } = position.byId[projectileId];
    const { yaw } = orientation.byId[projectileId];
    const { length } = hitLine.byId[projectileId];
    const { faces } = polyhedron.byId[targetId];
    const targetPos = position.byId[targetId];
    const triangles = faces.map(f => f.map(v => add([targetPos.xPos, targetPos.yPos, targetPos.zPos], v)))
    triangles.forEach(triangle => {
      const intersectionPoint = rayIntersectsTriangle([xPos, yPos, 0], [0, 0, yaw], triangle, length);
      if (intersectionPoint) {
        dispatch(lifespanComponent.update(projectileId, { ttl: 0 }));
        dispatch(healthComponent.update(targetId, { defence: 0 }))
      }
    })
  });
};