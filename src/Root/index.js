import React, { useState, useEffect, Fragment } from "react";
import { IntlProvider } from "react-intl";
import { MuiThemeProvider } from "@material-ui/core/styles";

import {
  getStandardizedLocale,
  normalizeLocale,
  getUserLanguage
} from "tools/language";
import localStorage from "tools/localStorage";
import firebase from "tools/firebase";

import UserContext from "shared/components/UserContext";

import Loader from "shared/components/Loader";

import css from "shared/styles/common.css"; // eslint-disable-line no-unused-vars
import theme from "config/theme";
import Routes from "./Routes";

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
              <Routes />
            </UserContext.Provider>
          </IntlProvider>
        )}
      </Fragment>
    </MuiThemeProvider>
  );
};

export default App;
