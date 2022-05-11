import { unique } from './array';

export const removeItem = (state, id) => {
  if (!(id in state.byId)) {
    console.warn('Missing item to remove', id);
  }

  const { [id]: _, ...byId } = state.byId;
  return {
    ...state,
    allIds: state.allIds.filter(i => i !== id),
    byId,
  };
};

export const updateItem = (state, item) => {
  if (!(item.id in state.byId)) {
    console.warn('Missing item to patch', item);
  }

  return {
    ...state,
    byId: {
      ...state.byId,
      [item.id]: {
        ...state.byId[item.id],
        ...item,
      },
    },
  };
};

export const addItem = (state, item) => {
  if (item.id in state.byId) {
    console.warn('Item already exists', item);
  }

  return {
    ...state,
    allIds: unique(state.allIds, item.id),
    byId: {
      ...state.byId,
      [item.id]: {
        ...item,
      },
    },
  };
};

export const defaultState = {
  allIds: [],
  byId: {},
};

export const createReducer = name => {
  const NAME = name.toUpperCase();

  const ADD_TYPE = `ADD_${NAME}`;
  const UPDATE_TYPE = `UPDATE_${NAME}`;
  const REMOVE_TYPE = `REMOVE_${NAME}`;
  const CLEAR_TYPE = `CLEAR${NAME}`;

  const reducer = (state = defaultState, action) => {
    const { type, payload: { id, ...data } = {} } = action;
    switch (type) {
      case ADD_TYPE:
        return addItem(state, { id, ...data });
      case UPDATE_TYPE:
        return updateItem(state, { id, ...data });
      case REMOVE_TYPE:
        return removeItem(state, id);
      case CLEAR_TYPE:
        return state;
      default:
        return state;
    }
  };

  reducer.add = (id, value) => {
    return {
      type: ADD_TYPE,
      payload: { id, ...value },
    };
  };

  reducer.update = (id, value) => {
    return {
      type: UPDATE_TYPE,
      payload: { id, value },
    };
  };

  reducer.remove = id => {
    return {
      type: REMOVE_TYPE,
      payload: { id },
    };
  };

  reducer.clear = () => {
    return {
      type: CLEAR_TYPE,
      payload: {},
    };
  };

  return reducer;
};