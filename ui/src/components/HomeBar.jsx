import React from 'react';
import styled from 'styled-components';
import {
  Link,
} from 'react-router-dom';
import HandsPurple from '../assets/HandsPurple.png';

const StyledBar = styled.div`
background-color: green;
text-align: center;
flex:1;
`;

const StyledImg = styled.img`
width: 40px;
height:auto;
`;

const StyledLink = styled(Link)`
dislpay: inline-block;
`;

const HomeBar = () => (
  <StyledBar>
    <StyledLink to={'/patients'}><StyledImg src={ HandsPurple }/></StyledLink>
  </StyledBar>
);

export default HomeBar;