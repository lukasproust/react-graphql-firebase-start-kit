import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {
  getStandardizedLocale,
  normalizeLocale,
  getUserLanguage,
} from 'tools/language';
import localStorage from 'tools/localStorage';

import Login from './components/Login';

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
            <Login />
          </MuiThemeProvider>
        </IntlProvider>
      </div>
    );
  }
}

export default App;
