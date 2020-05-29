import React from 'react';

const defaultUser = {
  role: 'customer',
  isAdmin: false,
  isLoggedIn: false,
};

const UserContext = React.createContext(
  defaultUser,
);

UserContext.displayName = 'UserContext';

export { UserContext, defaultUser };
