import * as React from "react";
import { useLocation, Navigate } from "react-router-dom";

const AuthContext = React.createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);

  const signIn = (newUser, token, callback) => {
    sessionStorage.setItem('accessToken', token);
    setUser(newUser);
    callback();
  };

  const signOut = (callback) => {
    sessionStorage.removeItem('accessToken');
    setUser(null);
    callback();
  };

  const value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

const PrivateRoute = ({children}) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    /** Redirect them to the /login page, but save the current location they were
    trying to go to when they were redirected. This allows us to send them
    along to that page after they login, which is a nicer user experience
    than dropping them off on the home page. */
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export {AuthProvider, useAuth, PrivateRoute}