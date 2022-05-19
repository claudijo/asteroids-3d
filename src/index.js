import './styles/main.css';
import { createElement } from './libs/html';
import { createStore } from './libs/store';
import rootReducer from './components/root';
import { createGameLoop } from './libs/game-loop';
import { setStage } from './assemblages/stage';
import { addShip } from './assemblages/ship';
import { drawPolyhedron } from './systems/draw-polyhedron';
import { clearStage } from './systems/clear-stage';
import { rotate } from './systems/rotate';
import { addAsteroids } from './assemblages/asteroids';
import { move } from './systems/move';
import { uid } from './libs/uid';

const gameLayerStageId = uid();

const stage = { width: 1920, height: 1080 };
const world = { width: 256, height: 144 };

const store = createStore(rootReducer);
const gameLoop = createGameLoop(store);

const gameCanvasElement = createElement('canvas',
  { id: 'game-layer', ...stage },
  { position: 'absolute', backgroundColor: '#333' },
);
const stageElement = createElement('div',
  { id: 'stage' },
  { position: 'relative', ...stage },
);
stageElement.appendChild(gameCanvasElement);
document.body.appendChild(stageElement);

store.subscribe(gameLoop.run);

gameLoop.addTask(
  rotate(gameLayerStageId),
  move(gameLayerStageId),
  clearStage(gameLayerStageId),
  drawPolyhedron(gameLayerStageId),
);

setStage(store.getState, store.dispatch, {
  id: gameLayerStageId,
  canvasElement: gameCanvasElement,
  world,
});
addShip(store.getState, store.dispatch);
addAsteroids(store.getState, store.dispatch, {
  count: 3,
  world,
});
