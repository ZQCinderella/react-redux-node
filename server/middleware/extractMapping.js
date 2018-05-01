/*
 * Created by sheng.yu on 2018-05-01 13:49:49. 
 * 提取mapping.json
 */

const path = require('path');
const relativePath = '../../public/dist/mapping.json';
const realPath = path.resolve(__dirname, relativePath);

let mapping = {};
const extractMapping = (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    //动态加载mapping
    mapping = res.locals.webpackStats.compilation.assets['mapping.json'].source()
  } else {
    delete require.cache(realPath);
    try {
      mapping = require(relativePath);
    } catch (err) {
      console.log(`mapping.json文件加载报错，${err}`)
      mapping = global.staticAssetsMapping || {}
    }
  }
  if (typeof mapping === 'string' && mapping) mapping = JSON.parse(mapping);
  global.staticAssetsMapping = mapping;
  next();
}

module.exports = extractMapping;