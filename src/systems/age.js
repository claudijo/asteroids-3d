import { lifespan as lifespanComponent, polyhedron as polyhedronComponent, } from '../components';

import * as componentsExports from '../components';

const { 'default': _, ...components } = componentsExports;

export const age = stageId => (getState, dispatch, deltaTime) => {
  const state = getState();
  const { lifespan, polyhedron } = state;

  lifespan.allIds.forEach(id => {
    let { ttl, fadeOut = NaN } = lifespan.byId[id];
    ttl -= deltaTime;

    if (ttl <= 0) {
      Object.keys(components).forEach(component => {
        if (typeof state[component].byId[id] !== 'undefined') {
          dispatch(components[component].remove(id));
        }
      });
    } else {
      if (!isNaN(fadeOut)) {
        const opacity = Math.min(1, ttl / fadeOut) ;
        const { color } = polyhedron.byId[id];
        const [r, g, b] = color;
        dispatch(polyhedronComponent.update(id, {
          color: [r, g, b, opacity],
        }))
      }

      dispatch(lifespanComponent.update(id, { ttl }));
    }
  });
};