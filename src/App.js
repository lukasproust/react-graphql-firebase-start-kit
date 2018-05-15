import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {
  getStandardizedLocale,
  normalizeLocale,
  getUserLanguage,
} from 'tools/language';
import localStorage from 'tools/localStorage';

import PrivateRoute from 'shared/components/PrivateRoute';
import Login from 'shared/components/Login';
import Dashboard from 'modules/dashboard/components/Root';
import NoMatch from 'shared/components/NoMatch';

import css from './shared/styles/common.css';

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

  render() {
    const { translations } = this.state;

    if (!translations) {
      return null;
    }

    return (
      <Fragment>
        <IntlProvider locale="en" messages={translations}>
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Router>
              <Fragment>
                <Route path="/login" component={Login} />
                <Switch>
                  <Redirect exact from="/" to="/dashboard" />
                  <PrivateRoute path="/dashboard" component={Dashboard} />
                  <Route component={NoMatch} />
                </Switch>
              </Fragment>
            </Router>
          </MuiThemeProvider>
        </IntlProvider>
      </Fragment>
    );
  }
}

export default App;
