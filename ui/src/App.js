import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { ThemeProvider } from 'styled-components';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import styled from 'styled-components';
import TopBar from './components/TopBar.jsx';
import Footer from './components/Footer.jsx';
import routes from './routes';
import theme from './theme';
import UserContext from './UserContext';
import { setToken } from './api';

const StyledApp = styled.div.attrs(props => ({
  className: 'App',
}))`
height: 100vh;
`;

const ContentContainer = styled.div`
margin-top: 5vh;
margin-bottom: 5vh;
`;

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
    <StyledApp>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value ={{ user, setUser }}>
          <Router>
            <TopBar/>
            <ContentContainer>
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
            </ContentContainer>
            <Footer />
          </Router>
        </UserContext.Provider>
      </ThemeProvider>
    </StyledApp>
  );
}
export default App;
