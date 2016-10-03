let webpack = require('webpack')
module.exports = {
  entry: './main.js',
  context: __dirname + '/app_test',
  output: {
    path: __dirname + '/build',
    filename: 'kalista.min.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules|build/,
        query: {
          presets: ['latest', 'react']
        }
      }
    ]
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
}
