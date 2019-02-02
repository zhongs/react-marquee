const path = require('path')

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: [path.resolve(__dirname, './app.js')],
  output: {
    path: path.resolve(__dirname, '../dist/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)?$/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
  ]
}

if (process.env.NODE_ENV === 'development') {

  module.exports.devtool = '#cheap-module-eval-source-map'

  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: __dirname + '/index.html',
      inject: true
    })
  ])
}


if (process.env.NODE_ENV === 'production') {

  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.DefinePlugin({
          'process.env': {
              NODE_ENV: '"production"'
          }
      }),
      new HtmlWebpackPlugin({
          filename: path.resolve(__dirname, '../dist/index.html'),
          template: __dirname + '/index.html',
          inject: true,
          minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: false
              // more options:
              // https://github.com/kangax/html-minifier#options-quick-reference
          },
          // necessary to consistently work with multiple chunks via CommonsChunkPlugin
          chunksSortMode: 'dependency'
      }),
      new webpack.optimize.UglifyJsPlugin({
          sourceMap: false,
          compress: {
              warnings: false
          }
      }),
      new webpack.LoaderOptionsPlugin({
          minimize: true
      })
  ])
}
