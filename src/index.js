import './styles/main.css';
import { createElement } from './libs/html';
import { createStore } from './libs/store';
import rootReducer from './components';
import { createGameLoop } from './libs/game-loop';
import { setStage } from './assemblages/stage';
import { addShip } from './assemblages/ship';
import { drawPolyhedron } from './systems/draw-polyhedron';
import { clearStage } from './systems/clear-stage';
import { rotate } from './systems/rotate';
import { addAsteroid } from './assemblages/asteroid';
import { move } from './systems/move';
import { uid } from './libs/uid';
import { drawLineSegment } from './systems/draw-line-segment';
import { age } from './systems/age';
import { projectileDamage } from './systems/projectile-damage';
import { accelerate } from './systems/accelerate';
import { range } from './libs/array';
import { randomInt } from './libs/number';
import { degenerate } from './systems/degenerate';
import { applyThrust } from './systems/apply-thrust';
import { slowDown } from './systems/slow-down';
import { accelerateRotation } from './systems/accelerate-rotation';
import { addFragment } from './assemblages/fragment';

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
  accelerateRotation(gameLayerStageId),
  rotate(gameLayerStageId),
  applyThrust(gameLayerStageId),
  accelerate(gameLayerStageId),
  slowDown(gameLayerStageId),
  move(gameLayerStageId),
  projectileDamage(gameLayerStageId),
  age(gameLayerStageId),
  degenerate(gameLayerStageId),
  clearStage(gameLayerStageId),
  drawLineSegment(gameLayerStageId),
  drawPolyhedron(gameLayerStageId),
);

// Stage
setStage(store.getState, store.dispatch, {
  id: gameLayerStageId,
  canvasElement: gameCanvasElement,
  world,
});

// Ship
addShip(store.getState, store.dispatch);

// Initial asteroids
const halfWidth = world.width / 2;
const halfHeight = world.height / 2;
range(5).forEach(_ => {
  const xPos = randomInt(-halfWidth, halfWidth);
  const yPos = randomInt(-halfHeight, halfHeight);
  addAsteroid(store.getState, store.dispatch, { cohort: 0, xPos, yPos });
});
