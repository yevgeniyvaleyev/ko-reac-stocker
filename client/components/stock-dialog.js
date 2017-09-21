import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, FlatButton, TextField } from 'material-ui';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';

import { inputTypes, isValidInput } from '../utils/form-validation';

const CustomGrid = styled(Grid)`
  width: auto
`;

class StockDialog extends Component {
  constructor(props) {
    super(props);
    this.onNameChange = this.onNameChange.bind(this);
    this.onCurrentPriceChange = this.onCurrentPriceChange.bind(this);
    this.cancel = this.cancel.bind(this);
    this.save = this.save.bind(this);
    this.props = props;

    this.state = {
      isValid: !props.isNew,
      dialog: { open: true },
      stock: props.stock,
    };
  }

  onCurrentPriceChange(event) {
    this.handleChange('currentPrice', parseInt(event.target.value, 10), inputTypes.number);
  }

  onNameChange(event) {
    this.handleChange('name', event.target.value, inputTypes.text);
  }

  getTitle() {
    return this.props.isNew ? 'Add stock' : 'Edit stock';
  }

  save() {
    this.props.onSave(this.state.stock);
    this.closeDialog();
  }

  cancel() {
    this.closeDialog();
    this.props.onCancel();
  }

  closeDialog() {
    this.setState({ dialog: { open: false } });
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
      stock,
      isValid,
      dialog,
    } = this.state;

    const actions = [
      <FlatButton
        label="Cancel"
        key={1}
        primary
        onClick={this.cancel}
      />,
      <FlatButton
        label="Save"
        key={2}
        disabled={!isValid}
        primary
        onClick={this.save}
      />,
    ];

    return (
      <Dialog
        title={this.getTitle()}
        actions={actions}
        open={dialog.open}
        modal={false}
      >
        <CustomGrid>
          <Row>
            <Col md={6} xs={12} sm={6}>
              <TextField
                hintText="Enter name"
                floatingLabelText="Name"
                onChange={this.onNameChange}
                fullWidth
                value={stock.name}
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
                value={stock.currentPrice}
              />
            </Col>
          </Row>
        </CustomGrid>
      </Dialog>
    );
  }
}

StockDialog.propTypes = {
  stock: PropTypes.object.isRequired,
  isNew: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default StockDialog;

