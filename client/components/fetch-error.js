import React from 'react';
import PropTypes from 'prop-types';
import { FlatButton, Paper } from 'material-ui';
import styled from 'styled-components';

const ErrorContainer = styled(Paper)`
  padding: 10px
`;

const FetchError = ({ message, onRetry }) => (
  <ErrorContainer>
    <span>Can't fetch stocks. {message}</span>
    <FlatButton label="Retry" onClick={onRetry} primary />
  </ErrorContainer>
);
FetchError.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default FetchError;
