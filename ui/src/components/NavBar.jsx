import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

const StyledNav = styled.nav`
color: ${(props) => props.theme.colors.main};
background-color: ${(props) => props.theme.colors.secondary};
display: flex;
justify-content: space-around;
padding 1em;
margin-bottom: 1em;
`;

const NavBar = () => (
  <StyledNav>
    <a>Offers</a>
    <a>Volunteers</a>
    <a>Patients</a>
    <a>Login</a>
  </StyledNav>
);
export default NavBar;
