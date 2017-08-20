import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Paper, Toolbar, ToolbarGroup, RaisedButton } from 'material-ui';
import Stocks from './stocks';

const style = {
  height: '100%',
  width: '50%',
  minWidth: '550px',
  margin: '0 auto',
};

export default class App extends Component {
  render() {
    return (
      <div>
        <Paper style={style} zDepth={1}>
          <Toolbar>
            <ToolbarGroup>
              <Link to="/add-stock"><RaisedButton label="Add stock" primary /></Link>
            </ToolbarGroup>
          </Toolbar>
          <Stocks />
        </Paper>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  params: PropTypes.object.isRequired,
  children: PropTypes.object,
};
