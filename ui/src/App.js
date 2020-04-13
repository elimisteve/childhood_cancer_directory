import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import OfferList from './components/OfferList.jsx';
import VolunteerList from './components/VolunteerList.jsx';
import PatientList from './components/PatientList.jsx';
import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';
import theme from './theme';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
          <Router>
            <Navigation/>
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
      </ThemeProvider>
    </div>
  );
}
export default App;
