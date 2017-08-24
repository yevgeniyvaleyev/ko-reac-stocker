import { getIsFetching } from '../reducers';
import { normalize } from 'normalizr';
import * as shema from './shema';

const fetchStocksSuccess = (response) => ({
  type: 'FETCH_STOCKS_SUCCESS',
  response: normalize(response, shema.arrayOfStocks),
});

const fetchStocksFailure = (message) => ({
  type: 'FETCH_STOCKS_FAILURE',
  message,
});

export const fetchStocksRequest = () => ({
  type: 'FETCH_STOCKS_REQUEST',
});

const addStockSuccess = (response) => ({
  type: 'ADD_STOCK_SUCCESS',
  response: normalize(response, shema.stock),
});

const addStockFailure = (message) => ({
  type: 'ADD_STOCK_FAILURE',
  message,
});

const updateStockSuccess = (response) => ({
  type: 'UPDATE_STOCK_SUCCESS',
  response: normalize(response, shema.stock),
});

const updateStockFailure = (message) => ({
  type: 'UPDATE_STOCK_FAILURE',
  message,
});

export const fetchStocks = () => (dispatch, getState) => {
  if (getIsFetching(getState())) {
    return Promise.resolve();
  }
  dispatch(fetchStocksRequest());
  return fetch('/api/stocks')
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }

      return dispatch(fetchStocksSuccess(data));
    })
    .catch((error) => {
      const message = error.message || 'Something went wrong!';
      dispatch(fetchStocksFailure(`${message}`));
    });
};

export const addStock = (name, currentPrice) => (dispatch) => {
  fetch('/api/stocks', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, currentPrice }),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => dispatch(addStockSuccess(data)))
    .catch((error) => {
      const message = error.message || 'Something went wrong!';
      dispatch(addStockFailure(`[Adding] ${message}`));
    });
};

export const updateStock = (name, currentPrice, id) => (dispatch) => {
  fetch(`/api/stocks/${id}`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, currentPrice }),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => dispatch(updateStockSuccess(data)))
    .catch((error) => {
      const message = error.message || 'Something went wrong!';
      dispatch(updateStockFailure(`[Update] ${message}`));
    });
};
