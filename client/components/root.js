import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { Grid } from 'react-flexbox-grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './app';
import ManageStock from './manage-stock';

const Root = ({ store }) => (
  <Provider store={store}>
    <MuiThemeProvider>
      <Grid>
        <Router history={browserHistory}>
          <Route
            path="/"
            name="app"
            component={App}
          >
            <Route
              path="/add-stock"
              name="add-stock"
              component={ManageStock}
            />
            <Route
              path="/edit-stock/:id"
              name="edit-stock"
              component={ManageStock}
            />
          </Route>
        </Router>
      </Grid>
    </MuiThemeProvider>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
