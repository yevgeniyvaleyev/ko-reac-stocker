import { combineReducers } from 'redux';
import byId, * as fromById from './collection-by-id';
import ids from './ids-list';
import isFetching from './fetching';
import isLoaded from './stocks-loaded';
import errorMessage from './error-message';

const stocks = combineReducers({
  byId,
  ids,
  isFetching,
  isLoaded,
  errorMessage,
});

export default stocks;

export const getStocks = (state) => {
  return state.ids.map((id) => fromById.getStock(state.byId, id));
};

export const getStockById = (state, id) => {
  return fromById.getStock(state.byId, id);
};

export const getIsFetching = (state) => state.isFetching;

export const getIsLoaded = (state) => state.isLoaded;

export const getErrorMessage = (state) => state.errorMessage;
