const baseConfig = require('../../webpack.base');
const merge = require('webpack-merge');

const config = {
  entry: './index.ts',
  output: {
    filename: 'index.js',
  }
}

const merged = merge(baseConfig, config);

module.exports = merged;
