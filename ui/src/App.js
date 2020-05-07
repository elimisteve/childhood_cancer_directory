import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { ThemeProvider } from 'styled-components';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import TopBar from './components/TopBar.jsx';
import Footer from './components/Footer.jsx';
import routes from './routes';
import theme from './theme';
import UserContext from './UserContext';
import { setToken } from './api';


function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      const decodedUser = jwt.decode(userToken);
      setToken(userToken);
      setUser(decodedUser);
    }
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <UserContext.Provider value ={{ user, setUser }}>
          <Router>
            <TopBar/>
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
            <Footer />
          </Router>
        </UserContext.Provider>
      </ThemeProvider>
    </div>
  );
}
export default App;
