const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const webpack = require('webpack')
// BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const config = require('./env')

const babelConf = require('../babel.config')

const resolve = name => `${config.build.DIR_NAME}${config.build.SOURCE}${name}`

const babelLoader = {
  loader: 'babel-loader',
  options: babelConf,
}

module.exports = {
  context: path.resolve(config.build.DIR_NAME, config.build.SOURCE),
  entry: {
    app: process.env.NODE_ENV === 'production' ? ['babel-polyfill', config.build.MAIN] : ['react-hot-loader/patch', config.build.MAIN],
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(config.build.DIR_NAME, config.build.OUTPUT),
    publicPath: config.build.PUBLIC_PATH,
  },
  resolve: {
    symlinks: false,
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      assets: resolve('/assets'),
      features: resolve('/features'),
      routes: resolve('/routes'),
      utils: resolve('/utils'),
      components: resolve('/components'),
      constants: resolve('/constants'),
      locale: resolve('/locale'),
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new ForkTsCheckerWebpackPlugin({ tslint: '../tslint.json', tsconfig: '../tsconfig.json' }),
    new ForkTsCheckerNotifierWebpackPlugin({ title: 'TypeScript', excludeWarnings: false }),
    new webpack.ProgressPlugin(),

    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(config.build.HTML_MAIN),
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],
  module: {
    rules: [
      { test: /\.ts(x)?$/, exclude: /node_modules/, use: [babelLoader, { loader: 'ts-loader', options: { transpileOnly: true } }] },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: config.theme,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /.(ico|jpg|jpeg|png|woff(2)?|eot|ttf|otf|svg|gif)(\?[a-z0-9=\.]+)?$/,
        include: path.resolve(__dirname, '../src/assets'),
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      }
    ],
  },
}
