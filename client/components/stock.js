import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Paper } from 'material-ui';
import styled from 'styled-components';

const Panel = styled(Paper)`
  padding: 10px
`;

const linkStyle = {
  float: 'right',
};

const dataCell = {
  display: 'inline-block',
  width: '250px',
};

const Stock = ({ name, id, currentPrice }) => (
  <Panel>
    <span style={dataCell}>
      <strong>Name:</strong> <span className="stock-name">{name}</span>
    </span>
    <span style={dataCell}>
      <strong>Price:</strong> <span className="stock-price">{currentPrice}</span>
    </span>
    <Link style={linkStyle} to={`/edit-stock/${id}`}>Edit</Link>
  </Panel>
);

Stock.propTypes = {
  name: PropTypes.string.isRequired,
  currentPrice: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default Stock;
