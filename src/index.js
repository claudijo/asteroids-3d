import { createElement } from './libs/html';
import { createStore } from './libs/store';
import rootReducer from './reducers/root';
import { createGameLoop } from './libs/game-loop';
import { setStage } from './assemblages/stage';
import { addShip } from './assemblages/ship';
import { drawPolyhedron } from './tasks/draw-polyhedron';
import { initUserInput } from './assemblages/user-input';

// const stage = { width: 1920, height: 1080}
const stage = { width: 480, height: 270 };
// const world = { width: 8, height: 4 };
const world = { width: 128, height: 72 };

const store = createStore(rootReducer);
const gameLoop = createGameLoop(store);

const canvasElement = createElement('canvas', stage);
document.body.appendChild(canvasElement);

store.subscribe(gameLoop.run);

store.subscribe(() => {
  console.log('Update...', store.getState()['userInput']['keyPressed'])
})

gameLoop.addTask(
  drawPolyhedron,
);

initUserInput(store.dispatch, canvasElement, world)
setStage(store.dispatch, canvasElement, world);
addShip(store.dispatch);
