import { lifespan as lifespanComponent } from '../components';
import * as componentsExports from '../components';

const { 'default': _, ...components } = componentsExports;

export const age = stageId => (getState, dispatch, deltaTime) => {
  const state = getState();
  const { lifespan } = state;

  lifespan.allIds.forEach(id => {
    let { ttl } = lifespan.byId[id];
    ttl -= deltaTime;

    if (ttl <= 0) {
      Object.keys(components).forEach(component => {
        if (typeof state[component].byId[id] !== 'undefined') {
          dispatch(components[component].remove(id));
        }
      });
    } else {
      dispatch(lifespanComponent.update(id, { ttl }));
    }
  });
};