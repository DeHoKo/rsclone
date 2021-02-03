import React, {useEffect, useState} from 'react';
import {Route, Switch,} from "react-router-dom";

import Header from './components/header/header';
import Main from './components/main/main';
import Footer from './components/footer/footer';
import SignUp from './components/auth/signup';
import SignIn from './components/auth/signin';
import LoadScreen from './components/common/loadScreen';
import Movie from "./components/main/movie/Movie";

import {AuthContext} from './context/auth-context';
import {useAuth} from './hooks/auth-hook';

import {useHttpClient} from './hooks/http-hook';
import {getConfiguration} from './api/API';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {red} from "@material-ui/core/colors";


function App() {
    const {token, login, logout, userId, userEmail} = useAuth();
    const {sendRequest} = useHttpClient();
    const [isLoading, setIsLoading] = useState(true);
    const [apiConfig, setApiConfig] = useState({});
    const [darkMode, setDarkMode] = useState(false);
    const themeType = darkMode ? "dark" : "light";
    const theme = createMuiTheme({
        palette: {
            type: themeType,
            primary: red,
            secondary: {main: '#1976d2'}
        }
    });
    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };
    useEffect(() => {
        getConfiguration(sendRequest).then(data => {
            setApiConfig(data);
            setIsLoading(false);
        });
    }, [sendRequest]);

    return (
        <ThemeProvider theme={theme}>
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
                {isLoading ? <LoadScreen/> :
                    <React.Fragment>
                        <Header themeState={darkMode} onThemeChange={handleThemeChange}/>
                        <Switch>
                            <Route exact path="/signin">
                                <SignIn/>
                            </Route>
                            <Route exact path="/signup">
                                <SignUp/>
                            </Route>
                            <Route exact path="/movies/:id">
                                <Movie/>
                            </Route>
                            <Route exact path="/tvshows/:id">
                                <Movie/>
                            </Route>
                            <Route path="/">
                                <Main/>
                            </Route>
                        </Switch>
                        <Footer/>
                    </React.Fragment>}
            </AuthContext.Provider>
        </ThemeProvider>
    );
}

export default App;
