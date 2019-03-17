const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const path = require('path');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: "twere",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hotOnly: true,
    overlay: true,
    host: 'localhost'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
