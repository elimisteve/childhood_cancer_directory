import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import OfferList from './components/OfferList.jsx';
import VolunteerList from './components/VolunteerList.jsx';
import PatientList from './components/PatientList.jsx';
import NavBar from './components/NavBar.jsx';
import Main from './components/Main.jsx';
import theme from './theme';
import api from './api';

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
        <NavBar />
        <Main>
          <OfferList offers={offers}/>
          <VolunteerList volunteers={people}/>
          <PatientList patients={people}/>
        </Main>
      </ThemeProvider>
    </div>
  );
}

export default App;
