import React from 'react';
import styled from 'styled-components';
import {
  Link,
} from 'react-router-dom';

const StyledNav = styled.nav`
color: ${(props) => props.theme.colors.main};
background-color: ${(props) => props.theme.colors.secondary};
display: flex;
justify-content: space-around;
padding 1em;
margin-bottom: 1em;
`;

const StyledLink = styled(Link)`
color: ${(props) => props.theme.colors.main};
`;

const Navigation = () => (
  <StyledNav>
    <StyledLink to='/offers'>Offers</StyledLink>
    <StyledLink to='/volunteers'>Volunteers</StyledLink>
    <StyledLink to='/patients'>Patients</StyledLink>
    {!('token' in sessionStorage) && <StyledLink to='/signup'>Sign up</StyledLink>}
    {!('token' in sessionStorage) && <StyledLink to='/signin'>Sign in</StyledLink>}
    {'token' in sessionStorage && <StyledLink to='/signup'>My Profile</StyledLink>}
  </StyledNav>
);

export default Navigation;
