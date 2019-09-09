const webpack = require('webpack');
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const getClientEnvironment = require('./src/config/env');

const env = getClientEnvironment();
const { NODE_ENV = 'development' } = process.env;
const isProd = NODE_ENV === 'production';
const srcDir = path.resolve(__dirname, 'src/');

module.exports = {
  entry: ['./src/index.tsx'],
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? 'nosources-source-map' : 'cheap-module-source-map',
  resolve: {
    modules: ['node_modules', srcDir],
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: isProd ? '' : '/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    hot: true,
    noInfo: true,
  },
  module: {
    rules: [
      {
        loader: 'eslint-loader',
        test: /\.(js|tsx?)$/,
        include: srcDir,
        enforce: 'pre',
      },
      {
        test: /\.(js|tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
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
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    ...(process.env.ANALYZE_BUNDLES === 'true'
      ? [new BundleAnalyzerPlugin()]
      : []),
  ],
};
