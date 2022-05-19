import * as components from '../components';
import { lifespan as lifespanComponent } from '../components';

export const age = stageId => (getState, dispatch, deltaTime) => {
  const { 'default': _, ...rest } = components;
  const state = getState();
  const { lifespan } = state;

  lifespan.allIds.forEach(id => {
    let { ttl } = lifespan.byId[id];
    ttl -= deltaTime;

    if (ttl < 0) {
      Object.keys(rest).forEach(component => {
        if (state[component].allIds.includes(id)) {
          dispatch(rest[component].remove(id));
        }
      });
    } else {
      dispatch(lifespanComponent.update(id, { ttl }));
    }
  });
};