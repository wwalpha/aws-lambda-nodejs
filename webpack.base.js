const path = require('path');
const Webpack = require('webpack');

module.exports = {
  mode: 'production',
  target: 'node',
  output: {
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ]
  },
  externals: ['aws-sdk'],
  resolve: {
    extensions: [
      '.ts', '.js'
    ],
  },
  plugins: [
    new Webpack.NoEmitOnErrorsPlugin(),
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new Webpack.LoaderOptionsPlugin({
      // minimize: true,
      debug: false
    })
  ],
  bail: true,
}
