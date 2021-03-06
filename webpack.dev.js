/*
 * Created by sheng.yu on 2018-04-29 16:27:21. 
 */
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const CleanWebpackPlugin = require('clean-webpack-plugin');
const publicPath = path.join(__dirname, 'public'); 

const ExtractCSS = new ExtractTextPlugin({
  filename: 'css/[name].bundle.css',
  allChunks: true
});
module.exports = (config) => {
  delete config.entry.vendor;
  return {
    entry: config.entry,
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(publicPath, 'dist/'),
      sourceMapFilename: './map/[file].map',
      publicPath: '/'
    },
    devtool: 'eval-source-map',
    resolve: {
      //自动扩展文件后缀名
      extensions: ['.js', '.less', 'css', '.png', '.jpg', '.gif'],
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
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(), // 热部署替换模块      
      new webpack.NoEmitOnErrorsPlugin(),
      //new CleanWebpackPlugin(['public/dist']),
      new webpack.LoaderOptionsPlugin({
        debug: true,
        options: {
          eslint: {
            emitError: true,
            configFile: '.eslintrc.js'
          }
        }
      }),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./public/dll/vendor-manifest.json'),
      }),
      new ManifestPlugin({
        fileName: 'mapping.json',
        publicPath: config.pathInMappingJson,
        seed: {
          title: config.title
        }
      }),
      ExtractCSS      
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
          use: ExtractCSS.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                sourceMap: true,
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