const webpack = require("webpack");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");

const getClientEnvironment = require("./src/config/env");

const env = getClientEnvironment();
const { NODE_ENV = "development" } = process.env;
const isProd = NODE_ENV === "production";
const srcDir = path.resolve(__dirname, "src/");

module.exports = {
  entry: ["./src/index.tsx"],
  mode: isProd ? "production" : "development",
  devtool: isProd ? "nosources-source-map" : "cheap-module-source-map",
  resolve: {
    modules: ["node_modules", srcDir],
    extensions: [".js", ".json", ".ts", ".tsx"]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    noInfo: true
  },
  module: {
    rules: [
      {
        loader: "eslint-loader",
        test: /\.(js|tsx?)$/,
        include: srcDir,
        enforce: "pre"
      },
      {
        test: /\.(js|tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[path]___[name]__[local]___[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "[name].[hash:7].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // Makes some environment variables available to the JS code.
    new webpack.DefinePlugin(env.stringified),
    new ErrorOverlayPlugin(),
    new HtmlWebPackPlugin({
      template: "./src/index.html"
    })
  ]
};
