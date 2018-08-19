const baseConfig = require('../../webpack.base');
const merge = require('webpack-merge');
const path = require('path');

const config = {
  entry: path.resolve(__dirname, 'app.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  }
}

const merged = merge(baseConfig, config);

module.exports = merged;
