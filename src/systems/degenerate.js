import { intersection, range } from '../libs/array';
import * as componentsExports from '../components';
import { addAsteroid, getRgbForAsteroid } from '../assemblages/asteroid';
import { addFragment } from '../assemblages/fragment';

const { 'default': _, ...components } = componentsExports;

export const degenerate = stageId => (getState, dispatch, deltaTime) => {
  const state = getState();
  const { generation, position, health } = state;
  const ids = intersection(position.allIds, generation.allIds, health.allIds);

  ids.forEach(id => {
    const { defence } = health.byId[id];

    if (defence === 0) {
      const { cohort } = generation.byId[id];
      const { xPos, yPos } = position.byId[id];

      Object.keys(components).forEach(component => {
        if (typeof state[component].byId[id] !== 'undefined') {
          dispatch(components[component].remove(id));
        }
      });

      range(10 * (3 - cohort)).forEach(_ => {
        addFragment(getState, dispatch,{xPos, yPos, rgb: getRgbForAsteroid(cohort)});
      });

      if (cohort < 2) {
        range(3).forEach(_ => {
          addAsteroid(getState, dispatch, { cohort: cohort + 1, xPos, yPos})
        });
      }
    }
  });
}