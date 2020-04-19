import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import routes from './routes';
import theme from './theme';
import UserContext from './UserContext';


function App() {
  const [user, setUser] = useState({});
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <UserContext.Provider value ={{ user, setUser }}>
          <Router>
            <Navigation />
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}>
                  {route.component}
                </Route>
              ))}
            </Switch>
          </Router>
        </UserContext.Provider>
      </ThemeProvider>
    </div>
  );
}
export default App;
