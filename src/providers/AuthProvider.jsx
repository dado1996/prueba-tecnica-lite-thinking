import { createContext, useState } from "react";
import { authInstance } from '../auth/auth';

const AuthContext = createContext(null);

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