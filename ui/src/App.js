import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import OfferList from './components/OfferList.jsx';
import VolunteerList from './components/VolunteerList.jsx';
import PatientList from './components/PatientList.jsx';
import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';
import theme from './theme';
import api from './api';

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

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <Router>
            <StyledNav>
              <StyledLink to='/offers'>Offers</StyledLink>
              <StyledLink to='/volunteers'>Volunteers</StyledLink>
              <StyledLink to='/patients'>Patients</StyledLink>
              {!('token' in sessionStorage) && <StyledLink to='/signup'>Sign Up</StyledLink>}
              {!('token' in sessionStorage) && <StyledLink to='/signin'>Sign in</StyledLink>}
              {'token' in sessionStorage && <StyledLink to='/signup'>My Profile</StyledLink>}
            </StyledNav>
            <Switch>
              <Route path="/offers">
                <OfferList/>
              </Route>
              <Route path="/volunteers">
                <VolunteerList/>
              </Route>
              <Route path="/patients">
                <PatientList/>
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path='/signin'>
                <Signin />
              </Route>
            </Switch>
          </Router>
        </CookiesProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
