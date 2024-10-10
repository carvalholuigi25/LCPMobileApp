const path = require('path');
const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'src'),
      },
      {
        directory: path.join(__dirname, 'src/assets'),
      }
    ],
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  optimization: {
    minimize: true,
  },
})