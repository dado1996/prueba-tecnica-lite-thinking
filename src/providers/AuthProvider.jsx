import React, { createContext, useState } from "react";
import { authInstance } from '../auth/auth';

const AuthContext = createContext(null);

/**
 * Auth provider to control access
 * @author Diego Delgado
 * @param {Object} props
 * @param {React.FC} children The components inside the auth provider
 * @returns The authentication component to restrict access to certain components
 */
function AuthProvider({ children }) {
  let [user, setUser] = useState({});

  let signin = (newUser, callback) => {
    return authInstance.signin(() => {
      setUser({...user, newUser});
      callback();
    });
  };

  let signout = (callback) => {
    return authInstance.signout(() => {
      setUser({});
      callback();
    });
  };

  const value = { user, signin, signout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };