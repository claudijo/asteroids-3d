// https://egghead.io/lessons/react-redux-implementing-store-from-scratch
export const createStore = reducer => {
  let state;
  const listeners = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      listener = listener.filter(l => l !== listener);
    }
  }

  dispatch({});

  return {
    getState,
    dispatch,
    subscribe,
  }
}

export const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {})
  };
}