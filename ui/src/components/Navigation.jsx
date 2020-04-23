import React from 'react';
import styled from 'styled-components';
import {
  Link,
} from 'react-router-dom';
import UserContext from '../UserContext';

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

const Navigation = () => {
  return (
  <UserContext.Consumer>
      {(value) => (
        <StyledNav>
          <StyledLink to='/volunteers'>Volunteers</StyledLink>
          <StyledLink to='/patients'>Patients</StyledLink>
          {!(value.user.token) && <StyledLink to='/signup'>Sign up</StyledLink>}
          {!(value.user.token) && <StyledLink to='/signin'>Sign in</StyledLink>}
          {value.user.token && <StyledLink to='/users/edit'>My Profile</StyledLink>}
        </StyledNav>
      )
      }
  </UserContext.Consumer>
  );
};

export default Navigation;
