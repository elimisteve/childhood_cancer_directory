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
height: 100%;
margin-left: 2%;
flex: 4;
`;


const StyledLink = styled(Link)`
color: ${(props) => props.theme.colors.main};
`;

const StyledButton = styled(StyledLink)``;

const Navigation = () => {

  const logOut = (setUserFn) => {
    setUserFn(null);
    localStorage.removeItem('token');
  };

  return (
  <UserContext.Consumer>
      {(value) => (
        <StyledNav>
          <StyledLink to='/volunteers'>Volunteers</StyledLink>
          <StyledLink to='/patients'>Patients</StyledLink>
          {!(value.user) && <StyledLink to='/signup'>Sign up</StyledLink>}
          {!(value.user) && <StyledLink to='/signin'>Sign in</StyledLink>}
          {value.user && <StyledLink to='/users/edit'>My Profile</StyledLink>}
          {value.user && <StyledButton onClick={() => logOut(value.setUser)}>log out</StyledButton>}
        </StyledNav>
      )
      }
  </UserContext.Consumer>
  );
};

export default Navigation;
