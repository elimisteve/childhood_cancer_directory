import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation.jsx';
import HomeBar from './HomeBar.jsx';

const StyledContainer = styled.div`
display:flex;
width: 100%;
height: ${props => props.theme.headerSize};
`;

const TopBar = () => (
  <StyledContainer>
    <HomeBar/>
    <Navigation/>
  </StyledContainer>
);

export default TopBar;
