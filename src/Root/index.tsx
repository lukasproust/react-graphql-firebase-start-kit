import React, { useState, useEffect, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from '@material-ui/styles';

import getUserLanguage from 'tools/intl/getUserLocale';
import getStandardizedLocale from 'tools/intl/getStandardizedOrNearestLocale';
import localStorage from 'tools/localStorage';
import firebase from 'tools/firebase';

import UserContext from 'shared/contexts/User';

import Loader from 'shared/components/Loader';

import theme from 'config/theme';
import { SupportedLocale } from 'config/locale';
import RoutesList from './RoutesList';

const App: React.FC = () => {
  const [translations, setTranslations] = useState<object | undefined>(
    undefined,
  );
  const [authReady, setAuthReady] = useState(false);
  const user = firebase.auth();

  const applyUserLocale = (userLocale: SupportedLocale) => {
    const locales = require.context('locales/', false, /\.json/);
    const localeKeys: string[] = locales.keys();
    const normalizedLocale: string = getStandardizedLocale(userLocale);
    localStorage.setItem('USER_LANGUAGE', normalizedLocale);
    const translationPath = localeKeys.find(
      key => !!key.match(normalizedLocale),
    );
    if (translationPath) setTranslations(locales(translationPath));
  };

  useEffect(() => {
    // if (viewer) {
    //   // Set real user locale
    //   this.applyUserLocale(viewer.locale);
    // } else {
    //   // Set fallback or previous user locale
    //   this.applyUserLocale(getUserLocale());
    // }
    applyUserLocale(getUserLanguage());
  }, []);

  user.onAuthStateChanged(userHas => {
    setAuthReady(true);
    // eslint-disable-next-line no-console
    if (userHas) console.log('User is connected :)', userHas);
    // eslint-disable-next-line no-console
    else console.log('No user connected... :(');
  });

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        {translations && authReady && (
          <IntlProvider locale="en" messages={translations}>
            <UserContext.Provider value={user}>
              <RoutesList />
            </UserContext.Provider>
          </IntlProvider>
        )}
        {!translations || (!authReady && <Loader />)}
      </Fragment>
    </ThemeProvider>
  );
};

export default App;
