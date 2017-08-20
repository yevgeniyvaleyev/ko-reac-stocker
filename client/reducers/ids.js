const ids = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_STOCKS_SUCCESS':
      return action.response.result;
    case 'ADD_STOCK_SUCCESS':
      return [...state, action.response.result];
    case 'UPDATE_STOCK_SUCCESS':
      return state.map((tmpId) => {
        return (action.response.result === tmpId) ? action.response.result : tmpId;
      });
    default:
      return state;
  }
};

export default ids;
