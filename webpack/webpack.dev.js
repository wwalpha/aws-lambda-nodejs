const Webpack = require('webpack');
const HappyPack = require('happypack');
const path = require('path');

module.exports = {
  mode: 'development',
  target: 'node',
  entry: {
    Cognito_AutoSignup: './src/cognito/auto-signup/app.ts',
    S3_PresignedUrl: './src/s3/pre-signed-url/app.ts',
  },
  output: {
    path: path.resolve(__dirname, '../dist/dev'),
    filename: '[name].js',
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
      loaders: ['ts-loader', 'babel-loader'],
    }),
    new Webpack.NoEmitOnErrorsPlugin(),
    new Webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],
  bail: true,
}
