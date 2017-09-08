const isLoaded = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_STOCKS_REQUEST':
      return false;
    case 'FETCH_STOCKS_SUCCESS':
      return true;
    case 'FETCH_STOCKS_FAILURE':
      return false;
    default:
      return state;
  }
};

export default isLoaded;
