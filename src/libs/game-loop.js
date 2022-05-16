import { debounce, throttle } from './rate-limit';

export const createGameLoop = store => {
  let tasks = [];
  let timestamp = performance.now();

  const addTask = (...newTasks) => {
    tasks = [...tasks, ...newTasks];
    return () => {
      tasks = tasks.filter(t => t !== task);
    }
  }

  const run = debounce(() => {
    const now = performance.now();
    const elapsed = now - timestamp;
    tasks.forEach(task => task(store.getState, store.dispatch, elapsed))
    timestamp = now;
  });

  return { addTask, run };
}