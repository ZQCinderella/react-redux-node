/*
 * Created by sheng.yu on 2018-04-29 17:54:48. 
 */

//前端页面路由
const express = require('express');
const router = express.Router();
const getJS = key => {
  const buildScript = src => `<script src=${src}></script>`;
  let script = '';
  if (global.staticAssetsMapping[`${key}.js`]) {
    if (process.env.NODE_ENV === 'development') {
      //script = `${buildScript(global.staticAssetsMapping['vendor.js'])}${buildScript(global.staticAssetsMapping[`${key}.js`])}`;
      script = `${buildScript('/public/dll/vendor.dll.js')}${buildScript(global.staticAssetsMapping[`${key}.js`])}`;
    } else {
      script = `${buildScript(global.staticAssetsMapping['vendor.js'])}${buildScript(global.staticAssetsMapping[`${key}.js`])}`;
    }
  }
  return script;
}

const getCSS = key => {
  const buildCSS = href => `<link rel="stylesheet" href="${href}">`;
  if (global.staticAssetsMapping[`${key}.css`]) {
    return `${buildCSS(global.staticAssetsMapping[`${key}.css`])}`;
  }
  return '';
}

router.get('*', (req, res, next) => {
  const data = {
    name: 'sheng.yu',
    age: '20',
    gender: 'male',
  }
  const key = 'client';
  res.render('client', {
    data: JSON.stringify(data),
    scripts: getJS(key),
    links: getCSS(key)
  });
})

module.exports = router;