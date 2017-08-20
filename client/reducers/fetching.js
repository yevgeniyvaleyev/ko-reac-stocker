const isFetching = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_STOCKS_REQUEST':
      return true;
    case 'FETCH_STOCKS_SUCCESS':
    case 'FETCH_STOCKS_FAILURE':
      return false;
    default:
      return state;
  }
};

export default isFetching;
