import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import OfferList from './components/OfferList.jsx';
import VolunteerList from './components/VolunteerList.jsx';
import PatientList from './components/PatientList.jsx';
import Signup from './components/Signup.jsx';
import theme from './theme';
import api from './api';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

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
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [loadingPeople, setLoadingPeople] = useState(true);
  const [offers, setOffers] = useState(null);
  const [people, setPeople] = useState(null);

  useEffect(() => {
    api.get('/offers').then((response) => {
      setOffers(response.data);
      setLoadingOffers(false);
    }).catch((error) => {
    });
    api.get('/people').then((response) => {
      setPeople(response.data);
      setLoadingPeople(false);
    }).catch((error) => {
    });
  }, []);

  if (loadingOffers || loadingPeople) {
    return <div>loading</div>;
  }
  return (
    <div className="App">
      <ThemeProvider theme={theme}>

        <Router>
          <StyledNav>
            <StyledLink to='/offers'>Offers</StyledLink>
            <StyledLink to='/volunteers'>Volunteers</StyledLink>
            <StyledLink to='/patients'>Patients</StyledLink>
            <StyledLink to='/signup'>Sign up</StyledLink>
          </StyledNav>
            <Switch>
              <Route path="/offers"  >
                <OfferList offers={offers} />
              </Route>
              <Route path="/volunteers">
                <VolunteerList volunteers={people} />
              </Route>
              <Route path="/patients">
                <PatientList patients={people} />
              </Route>
              <Route path = "/signup">
                <Signup/>
              </Route>
            </Switch>
        </Router>

      </ThemeProvider>
    </div>
  );
}

export default App;
