import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import routes from './routes';
import theme from './theme';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
          <Router>
            <Navigation/>
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
      </ThemeProvider>
    </div>
  );
}
export default App;
