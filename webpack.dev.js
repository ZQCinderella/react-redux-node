/*
 * Created by sheng.yu on 2018-04-29 16:27:21. 
 */
const webpack = require('webpack');
const fs = require('fs');
const publicPath = path.join(__dirname, 'public'); 

module.exports = (config) => {
  return {
    entry: config.entry,
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(publicPath, '/dist'),
      sourceMapFilename: './map/[file].map',
      chunkFilename: '[name].[hash].js',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.LoaderOptionsPlugin({
        debug: true,
        options: {
          eslint: {
            emitError: true,
            configFile: './eslintrc.js'
          }
        }
      })
    ],
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: 'node_modules',
          use: 'eslint-loader'
        },
        {
          test: /\.js$/,
          exclude: [
            path.resolve(__dirname, 'node_modules/react-pure-render'),
            path.resolve(__dirname, 'node_modules/redux-devtools-themes'),
            path.resolve(__dirname, 'node_modules/react-json-tree'),
            path.resolve(__dirname, 'node_modules/base16')
          ],
          use: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: ['style-loader', {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },{
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }]
        },
        {
          test: /\.sass$/,
          use: ['style-loader', {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            option: {
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }]
        },
        {
          test: /\.(png|gif|jpg)$/,
          use: {
            loader: 'url-loader',
            options: 
            {
              name: '[hash].[ext]',
              limit: 10000     //10kb  如果图片大于10K，则会生成图片会输出到output目录中， 否则会打包为base64
            }
          }
        },
        {
          test: /\.(mp4|ogg|eot|woff|ttf|svg)$/,
          use: 'file-loader'
        }
      ]
    }
  }
}