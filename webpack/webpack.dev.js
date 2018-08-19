const path = require('path');
const baseConfig = require('./webpack.base');
const merge = require('webpack-merge');

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, '../dist/dev'),
  }
}

const merged = merge(baseConfig, config);

module.exports = merged;
