import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatButton, Paper } from 'material-ui';
import styled from 'styled-components';

const ErrorContainer = styled(Paper)`
  padding: 10px
`;

class FetchError extends Component {
  render() {
    const { message, onRetry } = this.props;

    return (
      <ErrorContainer>
        <span>Can't fetch stocks. {message}</span>
        <FlatButton label="Retry" onClick={onRetry} primary />
      </ErrorContainer>);
  }
}
FetchError.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default FetchError;
