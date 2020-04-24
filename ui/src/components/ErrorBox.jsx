import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
color: #c81e1e;
border: 1px solid #f98080;
background-color: #fde8e8;
border-radius: 5px;
text-align: center;
padding: 2px;
`;

const ErrorBox = (props) => (
  <Container>
    <h2>Error</h2>
    <span>{ props.message }</span>
  </Container>
);

ErrorBox.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorBox;
