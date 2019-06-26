module.exports = () => {
  const NODE_ENV = process.env.NODE_ENV || "development";
  const APP_ENV = process.env.APP_ENV || NODE_ENV;
  // eslint-disable-next-line
  const appEnvConfig = require(`./env/${APP_ENV}.config.json`);

  const raw = Object.keys(appEnvConfig).reduce(
    (env, key) => {
      return Object.assign({}, env, { [key]: appEnvConfig[key] });
    },
    {
      NODE_ENV,
      APP_ENV,
      PUBLIC_URL: ""
    }
  );

  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    "process.env": Object.keys(raw).reduce((env, key) => {
      return Object.assign({}, env, { [key]: JSON.stringify(raw[key]) });
    }, {})
  };

  return { raw, stringified };
};
