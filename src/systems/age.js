import {
  lifespan as lifespanComponent,
  polyhedron as polyhedronComponent,
  appearance as appearanceComponent,
} from '../components';

import * as componentsExports from '../components';
import { intersection } from '../libs/array';

const { 'default': _, ...components } = componentsExports;

export const age = stageId => (getState, dispatch, deltaTime) => {
  const state = getState();
  const { lifespan, appearance } = state;
  const ids = intersection(lifespan.allIds, appearance.allIds);

  ids.forEach(id => {
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
        const opacity = Math.min(1, ttl / fadeOut);
        const { color } = appearance.byId[id];

        const [r, g, b] = color;
        dispatch(appearanceComponent.update(id, {
          color: [r, g, b, opacity],
        }));
      }

      dispatch(lifespanComponent.update(id, { ttl }));
    }
  });
};