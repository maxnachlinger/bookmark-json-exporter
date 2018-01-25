const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const {outputDirectory, sourceAssetsDirectory, indexEntryPath, backgroundEntryPath} = require('./config')

module.exports = {
  name: 'app',
  entry: {
    index: [indexEntryPath],
    background: [backgroundEntryPath]
  },
  output: {
    path: outputDirectory,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(outputDirectory, {allowExternal: true}),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
      {from: sourceAssetsDirectory}
    ]),
    new UglifyJSPlugin({
      parallel: true
    })
  ]
}
