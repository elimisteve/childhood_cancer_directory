import React from 'react';

const UserContext = React.createContext({
  user: null,
  setUser: (user) => { this.user = user; },
});

export default UserContext;
