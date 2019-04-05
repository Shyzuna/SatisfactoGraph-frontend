
const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');


let config = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // devtool: 'eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    historyApiFallback: true,
    inline: true,
    open: false,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'SatisfactoGraph',
      filename: path.resolve(__dirname, './dist/index.html'),
      template: path.resolve(__dirname, './src/index.html')
    })
  ],
  module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader"
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
            test: /\.(png|jpeg|jpg|svg)$/,
            loader: 'url-loader'
        }
    ]
  }
};

module.exports = config;
