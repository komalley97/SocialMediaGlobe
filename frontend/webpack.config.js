// Webpack uses this to work with directories
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// This is the main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {
  // Path to your entry point. From this file Webpack will begin his work
  entry: ['babel-polyfill', './src/index.js'],

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'sm-globe.js',
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/'),
    },
  },
  // externals: {
  //   jquery: 'jQuery',
  //   $: 'jQuery',
  // },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
    ],
  },

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on final bundle. For now we don't need production's JavaScript
  // minifying and other thing so let's set mode to development
  mode: 'production',
};
