const byId = (state = {}, action) => {
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.stocks,
    };
  }
  return state;
};

export default byId;

export const getStock = (state, id) => state[id];
