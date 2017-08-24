import { combineReducers } from 'redux';
import byId, * as fromById from './collection-by-id';
import ids from './ids-list';
import isFetching from './fetching';
import errorMessage from './error-message';

const stocks = combineReducers({
  byId,
  ids,
  isFetching,
  errorMessage,
});

export default stocks;

export const getStocks = (state) => {
  return state.ids.map((id) => fromById.getStock(state.byId, id));
};

export const getStockById = (state, id) => fromById.getStock(state.byId, id);

export const getIsFetching = (state) => state.isFetching;

export const getErrorMessage = (state) => state.errorMessage;
