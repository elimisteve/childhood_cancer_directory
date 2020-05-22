import React from 'react';
import styled from 'styled-components';
import {
  Link,
} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import UserContext from '../UserContext';
const StyledNav = styled.nav`
color: ${(props) => props.theme.colors.main};
display: flex;
justify-content: right;
height: 100%;
margin-left: 1vw;
align-items: center;
flex: 4;
`;


const StyledLink = styled(Link)`
font-size: ${(props) => props.theme.fontSizes.medium};
color: ${(props) => props.theme.colors.secondary};
top: 50%;
padding-right: 1rem;
`;

const StyledButton = styled(StyledLink)``;

const Navigation = (props) => {
  const logOut = (setUserFn) => {
    setUserFn({});
    localStorage.removeItem('token');
    props.history.push('/patients');
  };

  return (
  <UserContext.Consumer>
      {(value) => (
        <StyledNav>
          <StyledLink to='/volunteers'>Volunteers</StyledLink>
          <StyledLink to='/patients'>Patients</StyledLink>
          <StyledLink to='/resources'>Resources</StyledLink>
          {!(value.user.user_name) && <StyledLink to='/signup'>Sign up</StyledLink>}
          {!(value.user.user_name) && <StyledLink to='/signin'>Sign in</StyledLink>}
          {value.user.user_name && <StyledLink to='/users/edit'>My Profile</StyledLink>}
          {value.user.user_name && <StyledButton onClick={() => logOut(value.setUser)}>Log Out</StyledButton>}
        </StyledNav>
      )
      }
  </UserContext.Consumer>
  );
};

export default withRouter(Navigation);
