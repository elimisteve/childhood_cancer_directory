import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledMain = styled.main`
background-color: ${(props) => props.theme.colors.main};
color: ${(props) => props.theme.colors.secondary};
width: 80%;
margin: 3em auto 0 auto;
`;

const Main = (props) => {
  return (
    <StyledMain>
      {props.children}
    </StyledMain>
  );
};


Main.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Main;
