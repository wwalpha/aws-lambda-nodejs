const Webpack = require('webpack');
const path = require('path');
const baseConfig = require('./webpack.base');
const merge = require('webpack-merge');

const config = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist/prod'),
  },
  plugins: [
    new Webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ],
}

const merged = merge(baseConfig, config);

module.exports = merged;
