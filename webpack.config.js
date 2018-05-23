const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const webpackServeWaitpage = require('webpack-serve-waitpage');

const getClientEnvironment = require('./src/config/env');

const env = getClientEnvironment();
const { NODE_ENV = 'development' } = process.env;
const isProd = NODE_ENV === 'production';
const srcDir = path.resolve(__dirname, 'src/');

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? 'nosources-source-map' : 'cheap-module-source-map',
  resolve: {
    modules: ['node_modules', srcDir],
  },
  serve: {
    add: (app, middleware, options) => {
      app.use(
        webpackServeWaitpage(options, {
          title: 'Building — React GraphQl Firebase start kit',
        }),
      );
      app.use(convert(history()));
    },
  },
  module: {
    rules: [
      {
        loader: 'eslint-loader',
        test: /\.js$/,
        include: srcDir,
        enforce: 'pre',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader?sourceMap',
          'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]&root=/src',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[hash:7].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // Makes some environment variables available to the JS code.
    new webpack.DefinePlugin(env.stringified),
    new ErrorOverlayPlugin(),
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
};
