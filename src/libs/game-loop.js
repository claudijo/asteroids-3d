import { debounce, throttle } from './rate-limit';

export const createGameLoop = store => {
  let tasks = [];
  let timestamp = performance.now();

  const addTask = (...newTasks) => {
    tasks = [...tasks, ...newTasks];
    return () => {
      tasks = tasks.filter(t => t !== newTasks.includes(t));
    }
  }

  const run = debounce(() => {
    const now = performance.now();
    const deltaTime = now - timestamp;
    tasks.forEach(task => task(store.getState, store.dispatch, deltaTime))
    timestamp = now;
  });

  return { addTask, run };
}