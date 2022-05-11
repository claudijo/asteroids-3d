export const removeItem = (state, id) => {
  const { [id]: _, byId } = state.byId;
  return {
    ...state,
    allIds: state.allIds.filter(i => i !== id),
    byId,
  };
};

export const updateItem = (state, item) => {
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
  return {
    ...state,
    allIds: [...state.allIds, item.id],
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
}

export const createReducer = name => {
  const NAME = name.toUpperCase();
  const ADD = `ADD_${NAME}`;
  const UPDATE = `UPDATE_${NAME}`;
  const REMOVE = `REMOVE_${NAME}`;

  const reducer = (state = defaultState, action) => {
    const { type, payload: {id, ...data} = {} } = action;
    switch (type) {
      case ADD:
        return addItem(state, {id, ...date});
      case UPDATE:
        return updateItem(state,{id, ...data} );
      case REMOVE:
        return removeItem(state, id);
      default:
        return state;
    }
  }

  reducer.actionTypes = {
    [ADD]: ADD,
    [UPDATE]: UPDATE,
    [REMOVE]: REMOVE,
  };

  return reducer;
}