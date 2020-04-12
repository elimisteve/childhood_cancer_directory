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
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState(null);
  const [patients, setPatients] = useState(null);
  const [volunteers, setVolunteers] = useState(null);

  useEffect(() => {
    const promises = [];
    promises.push(api.get('/offers').then((response) => {
      setOffers(response.data);
    }).catch((error) => {
      console.log(error);
    }));
    promises.push(api.get('/patients').then((response) => {
      setPatients(response.data);
    }).catch((error) => {
    }));
    promises.push(api.get('/volunteers').then((response) => {
      setVolunteers(response.data);
    }).catch((error) => {
    }));
    Promise.all(promises).then((result) => {
      setLoading(false);
    }).catch((error) => {
    });
  }, []);

  if (loading) {
    return <div>loading</div>;
  }
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <Router>
            <StyledNav>
              <StyledLink to='/offers'>Offers</StyledLink>
              <StyledLink to='/volunteers'>Volunteers</StyledLink>
              <StyledLink to='/patients'>Patients</StyledLink>
              <StyledLink to='/signup'>Sign up</StyledLink>
              <StyledLink to='/login'>Sign in</StyledLink>
            </StyledNav>
            <Switch>
              <Route path="/offers">
                <OfferList offers={offers} />
              </Route>
              <Route path="/volunteers">
                <VolunteerList volunteers={volunteers} />
              </Route>
              <Route path="/patients">
                <PatientList patients={patients} />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path='/login'>
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
