import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {
  getStandardizedLocale,
  normalizeLocale,
  getUserLanguage,
} from 'tools/language';
import localStorage from 'tools/localStorage';

import PrivateRoute from 'components/shared/PrivateRoute';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NoMatch from './components/NoMatch';

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
      <div className={css.root}>
        <IntlProvider locale="en" messages={translations}>
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Router>
              <Fragment>
                <Route path="/login" component={Login} />
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
                <Route
                  path="/"
                  exact
                  render={() => (
                    <div>
                      {'Public path'}
                      <ul>
                        <li>
                          <Link to="/login">{'Login'}</Link>
                        </li>
                        <li>
                          <Link to="/dashboard">{'Dashboard'}</Link>
                        </li>
                      </ul>
                    </div>
                  )}
                />
                <Route component={NoMatch} />
              </Fragment>
            </Router>
          </MuiThemeProvider>
        </IntlProvider>
      </div>
    );
  }
}

export default App;
