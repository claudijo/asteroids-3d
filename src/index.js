import './styles/main.css';
import { createElement } from './libs/html';
import { createStore } from './libs/store';
import rootReducer from './components';
import { createGameLoop } from './libs/game-loop';
import { setStage } from './assemblages/stage';
import { drawPolyhedron } from './systems/draw-polyhedron';
import { clearStage } from './systems/clear-stage';
import { rotate } from './systems/rotate';
import { move } from './systems/move';
import { uid } from './libs/uid';
import { drawLineSegment } from './systems/draw-line-segment';
import { age } from './systems/age';
import { projectileDamage } from './systems/projectile-damage';
import { accelerate } from './systems/accelerate';
import { degenerate } from './systems/degenerate';
import { applyThrust } from './systems/apply-thrust';
import { slowDown } from './systems/slow-down';
import { accelerateRotation } from './systems/accelerate-rotation';
import { drawText } from './systems/draw-text';
import { showGameRound } from './scenes/game-round';
import { showSplash } from './scenes/splash';

const gameLayerStageId = uid();

const stage = { width: 960, height: 600 };
const world = { width: 240, height: 150 };

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
  drawText(gameLayerStageId),
  drawLineSegment(gameLayerStageId),
  drawPolyhedron(gameLayerStageId),
);

// Stage
setStage(store.getState, store.dispatch, {
  id: gameLayerStageId,
  canvasElement: gameCanvasElement,
  world,
});

let cleanUpSplash = showSplash(store, world);

const onInitialInteraction = event => {
  cleanUpSplash()
  showGameRound(store, world);
  window.removeEventListener('keydown', onInitialInteraction);
  gameCanvasElement.removeEventListener('touchstart', onInitialInteraction)
}

window.addEventListener('keydown', onInitialInteraction)
gameCanvasElement.addEventListener('touchstart', onInitialInteraction)

