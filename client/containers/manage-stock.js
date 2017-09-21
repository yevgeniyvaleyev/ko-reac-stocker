import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateStock, addStock } from '../actions';
import { getStockById, getIsLoaded } from '../reducers';
import StockDialog from '../components/stock-dialog';

class ManageStock extends Component {
  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
    this.save = this.save.bind(this);

    const newStock = {
      name: '',
      currentPrice: 0,
    };

    this.isNewStock = props.routeParams.id === undefined;
    const isRestored = !this.isNewStock && props.isLoaded;
    const isDataReady = this.isNewStock || isRestored;
    this.isInitialized = this.isNewStock || props.isLoaded;
    this.stock = isRestored
      ? props.getStock(props.routeParams.id)
      : newStock;

    this.state = {
      stock: this.stock,
      isDataReady,
    };
  }

  shouldComponentUpdate(newProps) {
    const { isLoaded } = newProps;

    return this.isNewStock ? true : isLoaded;
  }

  componentWillUpdate(nextProps) {
    const { isLoaded } = nextProps;
    if (isLoaded && !this.isNewStock && !this.isInitialized) {
      this.setRestoredStock(nextProps);
      this.setDataReadyState(isLoaded);
    }
  }

  setDataReadyState(flag) {
    this.setState({
      isDataReady: flag,
    });
  }

  setRestoredStock(nextProps) {
    const { routeParams, getStock } = nextProps;
    const stock = getStock(routeParams.id);
    this.isInitialized = true;
    this.setState({
      stock,
    });
  }

  save(stock) {
    const { name, currentPrice, id } = stock;
    const action = this.isNewStock
      ? addStock(name, currentPrice)
      : updateStock(name, currentPrice, id);
    this.props.dispatch(action);
    this.goBack();
  }

  goBack() {
    this.props.router.goBack();
  }

  render() {
    const {
      stock,
      isDataReady,
    } = this.state;

    if (isDataReady) {
      return (
        <StockDialog
          stock={stock}
          isNew={this.isNewStock}
          onSave={this.save}
          onCancel={this.goBack}
        />
      );
    }
    return (<div></div>);
  }
}

ManageStock.propTypes = {
  router: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  getStock: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  getStock: (id) => getStockById(state, id),
  isLoaded: getIsLoaded(state),
});

export default connect(mapStateToProps)(ManageStock);
