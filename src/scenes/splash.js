import { addLabel } from '../assemblages/label';
import { range } from '../libs/array';
import { randomInt } from '../libs/number';
import { addAsteroid } from '../assemblages/asteroid';
import * as componentsExports from '../components';

const { 'default': _, ...components } = componentsExports;

export const showSplash = (store, world) => {
  const halfWidth = world.width / 2;
  const halfHeight = world.height / 2;

  const labelIds = []

  labelIds[0] = addLabel(store.getState, store.dispatch, {
    text: 'Asteroids 3D', xPos: 0, yPos: 45, size: 4, lineWidth: 8, alignment: 'center',
  });
  labelIds[1] = addLabel(store.getState, store.dispatch, {
    text: 'Rotate left: Tilt device left or press arrow left key', xPos: 0, yPos: 15, size: 1, alignment: 'center'
  });
  labelIds[2] = addLabel(store.getState, store.dispatch, {
    text: 'Rotate right: Tilt device right or press arrow right key', xPos: 0, yPos: 5, size: 1, alignment: 'center'
  });
  labelIds[3] = addLabel(store.getState, store.dispatch, {
    text: 'Thrust: Tap left part of screen or press arrow up key ', xPos: 0, yPos: -5, size: 1, alignment: 'center'
  });
  labelIds[4] = addLabel(store.getState, store.dispatch, {
    text: 'Fire missile: Tap right part of screen or press space bar', xPos: 0, yPos: -15, size: 1, alignment: 'center'
  });
  labelIds[5] = addLabel(store.getState, store.dispatch, {
    text: 'Tap screen or press any key to start', xPos: 0, yPos: -45, size: 2, lineWidth: 6, alignment: 'center'
  });

  labelIds[6] = addLabel(store.getState, store.dispatch, {
    text: 'Vanilla JS Asteroids clone built with ^ and low poly 3D graphics by Claudijo Borovic 2022', xPos: 0, yPos: -65, size: 0.75, lineWidth: 2, alignment: 'center'
  });

  const asteroidsIds = range(6).map(index => {
    const xPos = randomInt(-halfWidth, halfWidth);
    const yPos = randomInt(-halfHeight, halfHeight);
    return addAsteroid(store.getState, store.dispatch, { cohort: index % 3, xPos, yPos });
  });

  return () => {
    const state = store.getState();
    [...labelIds, ...asteroidsIds].forEach(id => {
      Object.keys(components).forEach(component => {
        if (typeof state[component].byId[id] !== 'undefined') {
          store.dispatch(components[component].remove(id));
        }
      });
    })
  }
};