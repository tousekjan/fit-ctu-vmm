const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const config = require('./env')

const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval',
  optimization: {
    minimize: false,
    splitChunks: false,
  },
  watch: true,
  devServer: {
    port: '1235',
    hot: true,
    quiet: false,
    historyApiFallback: true,
    contentBase: [
      path.resolve(config.build.DIR_NAME, config.build.OUTPUT),
      path.resolve(config.build.DIR_NAME, `config/stageConfig/${process.env.STAGE_CONFIG || 'alpha'}`),
    ],
    overlay: {
      warnings: true,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'false',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    },
  },
})
