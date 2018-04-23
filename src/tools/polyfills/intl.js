export default () => {
  return new Promise(resolve => {
    if (global.Intl) {
      resolve();
      return;
    }

    require.ensure(
      ['intl', 'intl/locale-data/jsonp/en-US', 'intl/locale-data/jsonp/fr-FR'],
      require => {
        require('intl');
        require('intl/locale-data/jsonp/en-US');
        require('intl/locale-data/jsonp/fr-FR');
        resolve();
      },
      'intl-polyfill',
    );
  });
};
