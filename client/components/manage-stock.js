import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dialog, FlatButton, TextField } from 'material-ui';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';

import { updateStock, addStock } from '../actions';
import { getStockById, getIsLoaded } from '../reducers';
import { inputTypes, isValidInput } from '../utils/form-validation';


const CustomGrid = styled(Grid)`
  width: auto
`;


class ManageStock extends Component {
  constructor(props) {
    super(props);
    this.onNameChange = this.onNameChange.bind(this);
    this.onCurrentPriceChange = this.onCurrentPriceChange.bind(this);

    const newStock = {
      name: '',
      currentPrice: 0,
    };

    this.isNewStock = props.routeParams.id === undefined;
    this.isInitialized = this.isNewStock || props.isLoaded;
    this.stock = (!this.isNewStock && props.isLoaded)
      ? props.getStock(props.routeParams.id)
      : newStock;

    this.state = {
      isValid: !this.isNewStock,
      dialog: { open: true },
      stock: this.stock,
    };
  }

  shouldComponentUpdate(nextProps) {
    const { isLoaded } = nextProps;

    return this.isNewStock ? true : isLoaded;
  }

  componentWillUpdate(nextProps) {
    const { isLoaded } = nextProps;
    if (isLoaded && !this.isNewStock && !this.isInitialized) {
      this.setRestoredStock();
    }
  }

  onCurrentPriceChange(event) {
    this.handleChange('currentPrice', parseInt(event.target.value, 10), inputTypes.number);
  }

  onNameChange(event) {
    this.handleChange('name', event.target.value, inputTypes.text);
  }

  setRestoredStock() {
    const { routeParams, getStock } = this.props;
    const stock = getStock(routeParams.id);
    this.isInitialized = true;
    this.setState({
      stock,
    });
  }

  getTitle() {
    return this.isNewStock ? 'Add stock' : 'Edit stock';
  }

  save() {
    const { name, currentPrice, id } = this.state.stock;
    const action = this.isNewStock
      ? addStock(name, currentPrice)
      : updateStock(name, currentPrice, id);
    this.props.dispatch(action);
    this.closeDialog();
  }

  cancel() {
    this.closeDialog();
  }

  closeDialog() {
    this.setState({ dialog: { open: false } });
    this.props.router.goBack();
  }

  handleChange(name, value, type) {
    this.setState({
      isValid: isValidInput(value, type),
      stock: {
        ...this.state.stock,
        [name]: value,
      },
    });
  }

  render() {
    const {
      isLoaded,
    } = this.props;

    const {
      name,
      currentPrice,
    } = this.state.stock;

    const actions = [
      <FlatButton
        label="Cancel"
        key={1}
        primary
        onClick={() => this.cancel()}
      />,
      <FlatButton
        label="Save"
        key={2}
        disabled={!this.state.isValid}
        primary
        onClick={() => this.save()}
      />,
    ];

    return (
      <div>
        <Dialog
          title={this.getTitle()}
          actions={actions}
          open={this.state.dialog.open}
          modal={false}
        >
          {isLoaded &&
            <CustomGrid>
              <Row>
                <Col md={6} xs={12} sm={6}>
                  <TextField
                    hintText="Enter name"
                    floatingLabelText="Name"
                    onChange={this.onNameChange}
                    fullWidth
                    value={name}
                  />
                </Col>
                <Col md={6} xs={12} sm={6}>
                  <TextField
                    type="number"
                    min="0"
                    hintText="Enter current price"
                    floatingLabelText="Current price"
                    onChange={this.onCurrentPriceChange}
                    fullWidth
                    value={currentPrice}
                  />
                </Col>
              </Row>
            </CustomGrid>
          }
          {!isLoaded && <p>Loading...</p>}
        </Dialog>
      </div>
    );
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

