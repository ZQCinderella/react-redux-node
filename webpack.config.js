/*
 * Created by sheng.yu on 2018-04-29 15:48:08. 
 */
const path = require('path');
let currentWebpackConfigFile = './webpack.prod.js';
if (process.env.NODE_ENV === undefined) {
  console.log('NODE_ENV is undefind! use default [development].');
  process.env.NODE_ENV = 'development';
}

if (process.env.NODE_ENV === 'development') {
  currentWebpackConfigFile = './webpack.dev.js';
}

console.log(`NODE_ENV is ${process.env.NODE_ENV}`);
console.log(`use webpack config file is ${currentWebpackConfigFile}`);

const config = require('./Config.js');

//将热部署模块放入entry的入口中(除verdor入口), 进行热部署watch。类似于babel-polyfill

// const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
// if (process.env.NODE_ENV === 'development') {
//   for (const p in config.entry) {
//     console.log(p);
//     if (p !== 'vendor') {
//       config.entry[p].push(hotMiddlewareScript);
//     }
//   }
// }

const webpackConfig = require(currentWebpackConfigFile)(config);

module.exports = webpackConfig;

