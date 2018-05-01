/*
 * Created by sheng.yu on 2018-04-29 16:27:21. 
 */
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const publicPath = path.join(__dirname, 'public');

const extractCss = new ExtractTextPlugin({
  filename: 'css/[name].[hash].css',
  allChunks: true
});
module.exports = (config) => {
  return {
    entry: config.entry,
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(publicPath, 'dist'),
      sourceMapFilename: './map/[file].map',
      chunkFilename: '[name].[hash].js',
    },
    devtool: 'eval-source-map',
    resolve: {
      //自动扩展文件后缀名
      extensions: ['.js', '.less', '.png', '.jpg', '.gif'],
      //模块别名定义，方便直接引用别名
      // alias: {
      //   'react-router-redux': path.resolve(nodeModules, 'react-router-redux-fixed/lib/index.js'),
      // },
      // 参与编译的文件
      modules: [
        'client',
        'node_modules',
      ],
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      extractCss,
      new ManifestPlugin({
        fileName: 'mapping.json',
        publicPath: config.pathInMappingJson,
        seed: {
          title: config.title
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compressor: {
          warnings: false,
        },
        mangle: {
          except: [] // 设置不混淆变量名
        }
      }),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./public/dll/vendor-manifest.json'),
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: true,
        options: {
          eslint: {
            emitError: true,
            configFile: '.eslintrc.js'
          }
        }
      }),
    ],
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: '/node_modules/',
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
          use: extractCss.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: false,
                localIdentName: '[local][hash:base64:5]'
              }
            }, {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              }
            }]
          })
        },
        {
          test: /\.scss$/,
          use: ExtractCSS.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            }, {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            }, {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }]
          }),
        },
        {
          test: /\.(png|gif|jpg)$/,
          use: [{
            loader: 'url-loader',
            options:
            {
              name: '[hash].[ext]',
              limit: 10000     //10kb  如果图片大于10K，则会生成图片会输出到output目录中， 否则会打包为base64
            }
          }]
        },
        {
          test: /\.(mp4|ogg|eot|woff|ttf|svg)$/,
          use: [{ loader: 'file-loader' }]
        }
      ]
    }
  }
}