export const SET_STAGE = 'SET_STAGE';

const defaultState = {
  ctx: null,
  viewportWidth: NaN,
  viewportHeight: NaN,
  worldWidth: NaN,
  worldHeight: NaN
}

export const stage = (state = defaultState, action) => {
  const { type, payload: { ...stage } = {} } = action;
  switch(type) {
    case SET_STAGE:
      return {
        ...stage,
      }
    default:
      return state;
  }
}