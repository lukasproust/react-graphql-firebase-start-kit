import React, { Component, Fragment } from "react";
import { IntlProvider } from "react-intl";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";

import {
  getStandardizedLocale,
  normalizeLocale,
  getUserLanguage
} from "tools/language";
import localStorage from "tools/localStorage";
import { firebaseAuth } from "tools/firebase";

import UserContext from "shared/components/UserContext";
import PrivateRoute from "shared/components/PrivateRoute";
import Login from "shared/components/Login";
import Dashboard from "modules/dashboard/components/Root";
import NoMatch from "shared/components/NoMatch";
import css from "shared/styles/common.css"; // eslint-disable-line no-unused-vars

import theme from "config/theme";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      translations: undefined
    };
  }

  componentDidMount() {
    // if (this.props.viewer) {
    //  getUserLocale().then(userLocale => {
    //    this.applyUserLocale(userLocale);
    //  });
    // } else {
    console.log("getUserLanguage()", getUserLanguage());
    this.applyUserLocale(getUserLanguage());
    // }
  }

  applyUserLocale(userLocale) {
    const locales = require.context("locales/", false, /\.json/);
    const localeKeys = locales.keys();
    const normalizedLocale = normalizeLocale(getStandardizedLocale(userLocale));
    localStorage.setItem("USER_LANGUAGE", normalizedLocale);

    const translationPath = localeKeys.find(key => key.match(normalizedLocale));
    const translations = locales(translationPath);
    this.setState({ translations });
  }

  redirectUserOnDisconnect() {
    const { location } = this.props;

    firebaseAuth.onAuthStateChanged(
      user =>
        !user && (
          <Redirect
            to={{
              pathname: "/login", //  TODO add segment
              state: { from: location }
            }}
          />
        )
    );
  }

  render() {
    const { translations } = this.state;

    if (!translations) return null;

    return (
      <MuiThemeProvider theme={theme}>
        <IntlProvider locale="en" messages={translations}>
          <UserContext.Provider value={firebaseAuth}>
            <Router>
              <Fragment>
                {this.redirectUserOnDisconnect()}
                <Switch>
                  {/* Public pages */}
                  <Route path="/login" component={Login} />
                  {/* Redirect */}
                  <Redirect exact from="/" to="/dashboard" />
                  {/* Private pages */}
                  <PrivateRoute path="/dashboard" component={Dashboard} />
                  {/* 404 */}
                  <Route component={NoMatch} />
                </Switch>
              </Fragment>
            </Router>
          </UserContext.Provider>
        </IntlProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
