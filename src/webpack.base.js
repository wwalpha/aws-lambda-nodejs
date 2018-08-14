const Webpack = require('webpack');
const HappyPack = require('happypack');

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
      '.ts'
    ],
  },
  plugins: [
    new HappyPack({
      loaders: ['ts-loader'],
    }),
    new Webpack.NoEmitOnErrorsPlugin(),
    new Webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ],
  bail: true,
}
