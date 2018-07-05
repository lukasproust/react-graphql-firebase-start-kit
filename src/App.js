import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {
  getStandardizedLocale,
  normalizeLocale,
  getUserLanguage,
} from 'tools/language';
import localStorage from 'tools/localStorage';

import UserContext from 'shared/components/UserContext';
import PrivateRoute from 'shared/components/PrivateRoute';
import Login from 'shared/components/Login';
import Dashboard from 'modules/dashboard/components/Root';
import NoMatch from 'shared/components/NoMatch';

import css from './shared/styles/common.css'; // eslint-disable-line no-unused-vars
import firebase from './tools/firebase';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      translations: undefined,
    };
  }

  componentDidMount() {
    // if (this.props.viewer) {
    //  getUserLocale().then(userLocale => {
    //    this.applyUserLocale(userLocale);
    //  });
    // } else {
    console.log('getUserLanguage()', getUserLanguage());
    this.applyUserLocale(getUserLanguage());
    // }
  }

  applyUserLocale(userLocale) {
    const locales = require.context('locales/', false, /\.json/);
    const localeKeys = locales.keys();
    const normalizedLocale = normalizeLocale(getStandardizedLocale(userLocale));
    localStorage.setItem('USER_LANGUAGE', normalizedLocale);

    const translationPath = localeKeys.find(key => key.match(normalizedLocale));
    const translations = locales(translationPath);
    this.setState({ translations });
  }

  redirectUserOnDisconnect() {
    const { location } = this.props;

    firebase.auth().onAuthStateChanged(
      user =>
        !user && (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        ),
    );
  }

  render() {
    const { translations } = this.state;

    if (!translations) {
      return null;
    }

    // // Set firebase on context
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     console.log('User is Logged');
    //   } else {
    //     console.log('No user are logged');
    //     // No user is signed in.
    //   }
    // });

    return (
      <Fragment>
        <IntlProvider locale="en" messages={translations}>
          <UserContext.Provider value={firebase.auth()}>
            <Router>
              <Fragment>
                {this.redirectUserOnDisconnect()}
                <Route path="/login" component={Login} />
                <Switch>
                  <Redirect exact from="/" to="/dashboard" />
                  <PrivateRoute path="/dashboard" component={Dashboard} />
                  <Route component={NoMatch} />
                </Switch>
              </Fragment>
            </Router>
          </UserContext.Provider>
        </IntlProvider>
      </Fragment>
    );
  }
}

export default App;
