import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dialog, FlatButton, TextField } from 'material-ui';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';

import { updateStock, addStock } from '../actions';
import { getStockById } from '../reducers';


const CustomGrid = styled(Grid)`
  width: auto
`;


class ManageStock extends Component {
  constructor(props) {
    super(props);

    const newStock = {
      name: '',
      currentPrice: 0,
    };

    this.dispatch = props.dispatch;
    this.isNewStock = props.routeParams.id === undefined;
    this.stock = !this.isNewStock
      ? props.getStock(props.routeParams.id)
      : newStock;

    this.state = {
      isValid: !this.isNewStock,
      dialog: { open: true },
      stock: this.stock,
    };
  }

  getTitle() {
    return this.isNewStock ? 'Add stock' : 'Edit stock';
  }

  save() {
    const { name, currentPrice, id } = this.state.stock;
    const action = this.isNewStock
      ? addStock(name, currentPrice)
      : updateStock(name, currentPrice, id);
    this.dispatch(action);
    this.closeDialog();
  }

  cancel() {
    this.closeDialog();
  }

  closeDialog() {
    this.setState({ dialog: { open: false } });
    this.props.router.goBack();
  }

  isValid(value, type) {
    switch (type) {
      case 'text':
        return (typeof(value) === 'string' && value !== '');
      case 'number':
        return (!isNaN(value) && value >= 0);
      default:
        return true;
    }
  }

  handleChange(name, value, type) {
    this.setState({
      isValid: this.isValid(value, type),
      stock: {
        ...this.state.stock,
        [name]: value,
      },
    });
  }

  render() {
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

    const {
      name,
      currentPrice,
    } = this.state.stock;

    return (
      <div>
        <Dialog
          title={this.getTitle()}
          actions={actions}
          open={this.state.dialog.open}
          modal={false}
        >
          <CustomGrid>
            <Row>
              <Col md={6} xs={12} sm={6}>
                <TextField
                  hintText="Enter name"
                  floatingLabelText="Name"
                  onChange={(event) =>
                    this.handleChange('name', event.target.value, 'text')}
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
                  onChange={(event) =>
                    this.handleChange('currentPrice', parseInt(event.target.value, 10), 'number')}
                  fullWidth
                  value={currentPrice}
                />
              </Col>
            </Row>
          </CustomGrid>
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
};

const mapStateToProps = (state) => ({
  getStock: (id) => getStockById(state, id),
});

export default connect(mapStateToProps)(ManageStock);

