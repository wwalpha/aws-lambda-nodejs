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
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-typescript']
          }
        }
      },
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
<<<<<<< HEAD:webpack.base.js
      loaders: ['babel-loader', 'ts-loader'],
    }),
    new Webpack.NoEmitOnErrorsPlugin(),
    new Webpack.LoaderOptionsPlugin({
      minimize: false,
=======
      loaders: ['ts-loader'],
    }),
    new Webpack.NoEmitOnErrorsPlugin(),
    new Webpack.LoaderOptionsPlugin({
      minimize: true,
>>>>>>> 78424ce884b79e0e3b7623c78782268df4e9f36a:src/webpack.base.js
      debug: false
    })
  ],
  bail: true,
}
