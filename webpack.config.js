// webpack.config.js
var path = require('path');

module.exports = {
  entry: {
    index: './js/index-entry.js',
    blackjack: './js/blackjack/blackjack-entry.js',
    baccarat: './js/baccarat/baccarat-entry.js',
    roulette: './js/roulette/roulette-entry.js'
  },
  output: {
    filename: './[name]-bundle.js',
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env', '@babel/react']
          }
        },
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*']
  }
};