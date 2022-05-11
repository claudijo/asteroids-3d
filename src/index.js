import { createElement } from './libs/html';
import { createStore } from './libs/store';
import rootReducer from './components/root';
import { createGameLoop } from './libs/game-loop';
import { setStage } from './assemblages/stage';
import { addShip } from './assemblages/ship';
import { drawPolyhedron } from './systems/draw-polyhedron';
import { initUserInput } from './assemblages/user-input';
import { GAME_PLAY_STAGE_ID, SHIP_ID } from './constants';

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
  console.log(store.getState())
})

gameLoop.addTask(
  drawPolyhedron,
);

initUserInput(store.dispatch)
setStage(store.dispatch, { canvasElement, world, id: GAME_PLAY_STAGE_ID });
addShip(store.dispatch, { id: SHIP_ID });
