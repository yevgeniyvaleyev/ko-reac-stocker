import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { getStocks, getErrorMessage, getIsFetching } from '../reducers/index';
import { withRouter } from 'react-router';

import FetchError from '../components/fetch-error';
import StocksList from '../components/stocks-list';

class Stocks extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.props.fetchStocks();
  }

  render() {
    const {
      stocks,
      errorMessage,
      isFetching,
      ...rest } = this.props; // eslint-disable-line no-unused-vars

    if (isFetching && !stocks.length) {
      return <p>Loading...</p>;
    }

    if (errorMessage && !stocks.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      );
    }
    return (
      <StocksList
        stocks={stocks}
      />
    );
  }
}
Stocks.propTypes = {
  stocks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    currentPrice: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  fetchStocks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stocks: getStocks(state),
  errorMessage: getErrorMessage(state),
  isFetching: getIsFetching(state),
});

const mapDispatchToProps = {
  fetchStocks: actions.fetchStocks,
};

Stocks = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Stocks));

export default Stocks;
