const errorMessage = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_STOCKS_FAILURE':
      return action.message;
    case 'FETCH_STOCKS_REQUEST':
    case 'FETCH_STOCKS_SUCCESS':
    case 'UPDATE_STOCK_SUCCESS':
      return null;
    default:
      return state;
  }
};

export default errorMessage;
