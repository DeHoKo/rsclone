import React, {useEffect, useState} from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import Header from './components/header/header';
import Main from './components/main/main';
import Footer from './components/footer/footer';
import SignUp from './components/auth/signup';
import SignIn from './components/auth/signin';
import LoadScreen from './components/common/loadScreen';
import Movie from "./components/main/movie/Movie";
import MoviesList from "./components/main/movie/moviesList";

import { AuthContext } from './context/auth-context';
import { useAuth } from './hooks/auth-hook';

import { useHttpClient } from './hooks/http-hook';
import { getConfiguration } from './api/API';


function App() {
  const { token, login, logout, userId, userEmail } = useAuth();
  const { sendRequest, isLoading } = useHttpClient();
  const [apiConfig, setApiConfig] = useState({});

  useEffect(() => {
    getConfiguration(sendRequest).then(data => setApiConfig(data));
  }, [sendRequest]);

  return (
    <AuthContext.Provider
      value={{
        apiConfig,
        isLoggedIn: !!token,
        token,
        userId,
        userEmail,
        login,
        logout
      }}
    >
      {isLoading ? <LoadScreen /> :
        <React.Fragment>
          <Header />
          <Switch>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/">
              <Main />
            </Route>
            <Route path="/movies/:movieId">
              <Movie />
            </Route>
            <Route exact path="/movies/categories/:categoryId">
              <MoviesList />
            </Route>
          </Switch>
          <Footer />
        </React.Fragment>}
    </AuthContext.Provider>
  );
}

export default App;
