import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import Header from './components/header/header';
import Main from './components/main/main';
import Footer from './components/footer/footer';
import SignUp from './components/auth/signup';

import { AuthContext } from './context/auth-context';
import { useAuth } from './hooks/auth-hook';

function App() {
  const { token, login, logout, userId, userEmail } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        userId,
        userEmail,
        login,
        logout
      }}
    >
      <Header />
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
