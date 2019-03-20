import React, { useState, useEffect, lazy, Suspense, Fragment } from "react";
import { IntlProvider } from "react-intl";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";

import {
  getStandardizedLocale,
  normalizeLocale,
  getUserLanguage
} from "tools/language";
import localStorage from "tools/localStorage";
import firebase from "tools/firebase";

import UserContext from "shared/components/UserContext";
import PrivateRoutes from "routes/PrivateRoutes";
import NoMatch404 from "shared/components/NoMatch404";
import css from "shared/styles/common.css"; // eslint-disable-line no-unused-vars
import theme from "config/theme";
import Loader from "./Loader";

const Login = lazy(() => import("shared/components/Login"));

const App = () => {
  const [translations, setTranslations] = useState();
  const [authReady, setAuthReady] = useState(false);
  const user = firebase.auth();

  const applyUserLocale = userLocale => {
    const locales = require.context("locales/", false, /\.json/);
    const localeKeys = locales.keys();
    const normalizedLocale = normalizeLocale(getStandardizedLocale(userLocale));
    localStorage.setItem("USER_LANGUAGE", normalizedLocale);

    const translationPath = localeKeys.find(key => key.match(normalizedLocale));
    const nextTranslations = locales(translationPath);
    setTranslations(nextTranslations);
  };

  useEffect(() => {
    applyUserLocale(getUserLanguage());
  }, []);

  user.onAuthStateChanged(userHas => {
    setAuthReady(true);
    if (userHas) {
      console.log("userrrr"); // eslint-disable-line no-console
    } else {
      console.log("noppee"); // eslint-disable-line no-console
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Fragment>
        {!translations || (!authReady && <Loader />)}
        {translations && authReady && (
          <IntlProvider locale="en" messages={translations}>
            <UserContext.Provider value={user}>
              <Router>
                <Suspense fallback={<Loader />}>
                  <Switch>
                    <Redirect exact from="/" to="/login" />
                    <Route path="/login" component={Login} />
                    <PrivateRoutes />
                    <Route component={NoMatch404} />
                  </Switch>
                </Suspense>
              </Router>
            </UserContext.Provider>
          </IntlProvider>
        )}
      </Fragment>
    </MuiThemeProvider>
  );
};

export default App;
