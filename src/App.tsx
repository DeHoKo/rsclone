import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import Header from './components/header/header';
import Main from './components/main/main';
import Footer from './components/footer/footer';
import SignUp from './components/auth/signup';
import SignIn from './components/auth/signin';

import { AuthContext } from './context/auth-context';
import { useAuth } from './hooks/auth-hook';
import Movie from "./components/main/movie/Movie";
import MoviesList from "./components/main/movie/moviesList";

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
    </AuthContext.Provider>
  );
}

export default App;
