import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/index';
import * as shema from '../../actions/shema';
import fetchMock from 'fetch-mock';
import { normalize } from 'normalizr';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(() => {
  fetchMock.reset();
  fetchMock.restore();
});

test('creates stocks fetching related actions when fetchStocks are called', () => {
  const response = [{
    id: 0,
    name: 'Stock 1',
    currentPrice: 123,
    lastUpdate: 1524083183202,
  }];
  fetchMock
    .getOnce('/api/stocks', { body: response, headers: { 'content-type': 'application/json' } })

  const expectedActions = [
    { type: 'FETCH_STOCKS_REQUEST' },
    {
      type: 'FETCH_STOCKS_SUCCESS',
      response: normalize(response, shema.arrayOfStocks)
    },
  ];
  const store = mockStore({ ids: [], isLoaded: false });

  return store.dispatch(actions.fetchStocks()).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions)
  });
});
